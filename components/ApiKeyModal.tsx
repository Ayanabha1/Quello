"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOpenAIKeyModal } from "@/hooks/useOpenAIKeyModal";
import { SettingsIcon } from "lucide-react";

const ApiKeyModal = () => {
  const openAIApIKeyModal = useOpenAIKeyModal();
  const formSchema = z.object({
    apiKey: z.string().min(1, {
      message: "Please enter your api key",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    localStorage.setItem("OPENAI_API_KEY", values.apiKey);
    openAIApIKeyModal.onClose();
  };

  return (
    <Dialog
      open={openAIApIKeyModal.isOpen}
      onOpenChange={openAIApIKeyModal.onClose}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter OpenAI API Key</DialogTitle>
          <DialogDescription>
            <p>
              Please enter your openai api key to continue. You can change it
              anytime in settings.
            </p>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>OpenAI Api Key</FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="OpenAI Api Key"
                      {...field}
                      className="border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
