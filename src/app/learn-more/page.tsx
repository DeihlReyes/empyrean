"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Footer from "@/components/footer";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  company: z.string().min(1, { message: "Company is required." }),
  position: z.string().min(1, { message: "Position is required." }),
  phone: z
    .string()
    .min(7, { message: "Phone number must be at least 7 digits." })
    .regex(/^[0-9+\-() ]+$/, { message: "Invalid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  announcement: z.boolean().optional(), // ✅ made optional
});

export default function LearnMore() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      position: "",
      phone: "",
      email: "",
      announcement: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      toast.success(
        "Thank you! A representative from Empyrean will be in touch."
      );
    } else {
      toast.error("Something went wrong. Please try again.");
    }
    form.reset();
  }

  return (
    <>
      <main className="min-h-screen flex flex-col items-center bg-white px-4 py-20">
        <h1 className="font-bold text-3xl text-center mb-4">
          WE ARE CENTRALISING REAL ESTATE.
        </h1>
        <p className="text-sm text-center max-w-3xl mb-8">
          ...and we&apos;d like you to be part of it. Whether you&apos;re an
          independent broker, working as an agent, a developer representative,
          real estate firm, or any business related to real estate and providing
          a home, any business, big or small. We&apos;d like you to join us.
        </p>

        <div className="border border-gray-300 rounded-2xl p-6 max-w-3xl w-full bg-white mb-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="relative min-w-[60px] h-[60px]">
              <div className="bg-gray-200 rounded-full w-full h-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-0 text-xl font-bold uppercase whitespace-nowrap">
                LET US REACH YOU.
              </div>
            </div>
          </div>
          <div className="text-sm text-left">
            Kindly send us your information for our contacting. By providing
            your contact details, you allow us to use your information for
            legitimate purposes and initiatives by Empyrean such as being added
            to our network for further contacting or partnerships.
          </div>
        </div>

        {/* Contact Form Box */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="border border-gray-300 rounded-2xl p-8 max-w-3xl w-full bg-white flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NAME</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>COMPANY</FormLabel>
                  <FormControl>
                    <Input placeholder="Company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>POSITION</FormLabel>
                  <FormControl>
                    <Input placeholder="Position" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PHONE NUMBER</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>EMAIL ADDRESS</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email address"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="announcement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      className="w-5 h-5 mr-2 accent-gray-700"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    I&apos;d like to be added to the official announcement
                    channel of Empyrean Group of Partners.
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="bg-[#494949] hover:bg-[#494949]/80 text-white rounded-full py-4 w-full"
            >
              {form.formState.isSubmitting ? "Sending..." : "Send"}
            </Button>
          </form>
        </Form>
      </main>
      <Footer />
    </>
  );
}
