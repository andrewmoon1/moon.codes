/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const CodeSchema = new mongoose.Schema({
  id: String,
  title: String,
  code: String,
  date: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Code' collection in the MongoDB database
export default mongoose.model('Code', CodeSchema);
