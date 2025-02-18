import mongoose from "mongoose";
import { socialLinksSchema } from "./social_links.model.js";

const clientSchema = new mongoose.Schema({
  image: {
    type: String
  },
  website: {
    type: String
  },
  whatsappNumber: {
    type: String
  },
  country: {
    type: String
  },
  state: {
    type: String
  },
  friendlyAddress: {
    type: String
  },
  introduceYourself: {
    type: String
  },

  social: {
    type: socialLinksSchema,
  }
});

export const ClientModel = mongoose.model("ClientProfile", clientSchema);
export default ClientModel;
