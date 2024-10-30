import * as yup from "yup";

export const VALIDATION_SCHEMA = yup.object().shape({
  "Claim ID": yup.number().integer().required(),
  "Subscriber ID": yup.string().required(),
  "Member Sequence": yup.number().integer().required(),
  "Claim Status": yup.string().oneOf(["Payable", "Denied", "Partial Deny"]).required(),
  Billed: yup.number().required(),
  Allowed: yup.number().required(),
  Paid: yup.number().required(),
  "Payment Status Date": yup.date().required(),
  "Service Date": yup.date().required(),
  "Received Date": yup.date().required(),
  "Entry Date": yup.date().required(),
  "Processed Date": yup.date().required(),
  "Paid Date": yup.date().required(),
  "Payment Status": yup.string().required(),
  "Group Name": yup.string().required(),
  "Group ID": yup.string().required(),
  "Division Name": yup.string().required(),
  "Division ID": yup.string().required(),
  Plan: yup.string().required(),
  "Plan ID": yup.string().required(),
  "Place of Service": yup.string().required(),
  "Claim Type": yup.string().oneOf(["Professional", "Institutional"]).required(),
  "Procedure Code": yup.string().required(),
  "Member Gender": yup.string().oneOf(["Male", "Female"]).required(),
  "Provider ID": yup.number().integer().required(),
  "Provider Name": yup.string().required(),
});

export type ValidationData = yup.InferType<typeof VALIDATION_SCHEMA>;
