"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const formSchema = z.object({
  userType: z.enum(
    [
      "property-owner",
      "buyer-tenant-guest",
      "broker-agent-realtyfirm",
      "developer-representative",
      "business-professional",
    ],
    {
      required_error: "Please select a user type.",
    }
  ),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userType: "property-owner",
      name: "",
      email: "",
      subject: "",
      message: "",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-3 justify-center"
                >
                  {[
                    {
                      value: "property-owner",
                      label: "Property Owner",
                    },
                    {
                      value: "buyer-tenant-guest",
                      label: "Buyer/Tenant/Guest",
                    },
                    {
                      value: "broker-agent-realtyfirm",
                      label: "Broker/Agent/Realty Firm",
                    },
                    {
                      value: "developer-representative",
                      label: "Developer Representative",
                    },
                    {
                      value: "business-professional",
                      label: "Business/Professional",
                    },
                  ].map(({ value, label }) => (
                    <div
                      key={value}
                      className={`flex items-center space-x-2 rounded-full px-4 py-2 cursor-pointer ${
                        field.value === value
                          ? "bg-[#494949] text-white"
                          : "border border-gray-300 text-[#494949]"
                      }`}
                    >
                      <RadioGroupItem
                        value={value}
                        id={value}
                        className="hidden"
                      />
                      <label
                        htmlFor={value}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your name"
                    {...field}
                    className="rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input placeholder="Your phone number" className="rounded-md" />
            </FormControl>
          </FormItem>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Email Address"
                  {...field}
                  className="rounded-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input
                  placeholder="Subject of your inquiry"
                  {...field}
                  className="rounded-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your message"
                  {...field}
                  className="rounded-md min-h-[150px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-start">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-[#494949] hover:bg-[#494949]/80 text-white rounded-full py-4 w-full"
          >
            {form.formState.isSubmitting ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
