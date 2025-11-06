import { z } from "zod";

const BusinessAddressSchema = z.object({
  line1: z.string(),
  line2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  pincode: z.string(),
});

const LicenseSchema = z.object({
  type: z.string(),
  number: z.string(),
  showDeleteButton: z.boolean(),
});

const BusinessInfoSchema = z.object({
  name: z.string(),
  tagline: z.string().optional(),
  logo: z.string().optional(),
  bussinessAddress: z.array(BusinessAddressSchema),
  mobileNumber: z.string(),
  telephone: z.string().optional(),
  email: z.string().optional(),
  licenses: z.array(LicenseSchema),
});

export type BusinessInfo = z.infer<typeof BusinessInfoSchema>;

export {  BusinessInfoSchema , BusinessAddressSchema , LicenseSchema };