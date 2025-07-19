const express = require("express");
const mongoose = require("mongoose");
const { userAuth } = require("../middleware/auth.js");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionrequest");
const User = require("../models/user");

// SEND REQUEST
requestRouter.post("/request/send/:status/:receiver", userAuth, async (req, res) => {
  try {
    const sender = req.user._id;
    const receiver = req.params.receiver;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status type: " + status });
    }

    const toUser = await User.findById(receiver);
    if (!toUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Connection request already exists!" });
    }

    const newRequest = new ConnectionRequest({ sender, receiver, status });
    const data = await newRequest.save();

    res.json({
      message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
      data,
    });

  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// REVIEW REQUEST
requestRouter.post("/request/review/:status/:requestid", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestid } = req.params;

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Status not allowed" });
    }

    const foundRequest = await ConnectionRequest.findOne({
      _id: requestid,
      receiver: loggedInUser._id,
      status: "interested",
    });

    if (!foundRequest) {
      return res.status(404).json({ message: "Connection request not found or invalid" });
    }

    foundRequest.status = status;
    const data = await foundRequest.save();

    res.json({ message: `Connection request ${status}`, data });

  } catch (err) {
    console.error("Review Error:", err);
    res.status(500).send("ERROR: " + err.message);
  }
});

module.exports = requestRouter;
