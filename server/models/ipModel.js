import mongoose from 'mongoose';
import moment from 'moment-timezone';

const ipSchema = new mongoose.Schema({
  ip: { type: String },
  city: { type: String },
  region: { type: String },
  country: { type: String },
  loc: { type: String },
  postal: { type: String },
  timezone: { type: String },
  abuse: {
    address: { type: String },
    country: { type: String },
    email: { type: String },
    name: { type: String },
    network: { type: String },
    phone: { type: String },
  },
  visited: [{ type: String }], // Changed the type to String to store formatted date and time
  visitedCount: { type: Number, default: 1 },
});

ipSchema.pre('save', function (next) {  
  const formattedDate = moment().tz('Asia/Kolkata').format('D MMMM YYYY, h:mm A');
  this.visited.push(formattedDate);
  this.visitedCount = this.visited.length;
  next();
});

const IpInfo = mongoose.model('IpInfo', ipSchema);

export default IpInfo;
