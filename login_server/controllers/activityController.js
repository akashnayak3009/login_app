import Activity from "../models/activityModel.js";

export const postLoginActivity = async (req, res) => {
    const { userId } = req.body;
  
    try {
      const lastActivity = await Activity.findOne({ user: userId }).sort({
        timestamp: -1,
      });
  
      if (!lastActivity) {
        const newActivity = new Activity({ user: userId, loginTimestamp: new Date() });
        await newActivity.save();
      } else {
        lastActivity.loginTimestamp = new Date();
        await lastActivity.save();
      }
      res.json({ message: "Login successful" });
    } catch (error) {
      console.error("Error updating login timestamp:", error);
      res.status(500).json({ error: "Error updating login timestamp" });
    }
  };
  

export const postLogoutActivity= async (req, res) => {
  const { userId } = req.body; 
  try {
    const lastActivity = await Activity.findOne({ user: userId }).sort({
      timestamp: -1,
    });
    lastActivity.logoutTimestamp = new Date();
    await lastActivity.save();
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Error updating logout timestamp" });
  }
};

export const getLoginActivity= async (req, res) => {
    const userId = req.user.id; 
    try {
      const lastActivity = await Activity.findOne({ user: userId }).sort({ timestamp: -1 });
      res.json({ loginTime: lastActivity.loginTimestamp });
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving login time' });
    }
  };
  
  export const getLogoutActivity= async (req, res) => {
    const userId = req.user.id; 
    try {
      const lastActivity = await Activity.findOne({ user: userId }).sort({ timestamp: -1 });
      res.json({ logoutTime: lastActivity.logoutTimestamp });
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving logout time' });
    }
  };
  
