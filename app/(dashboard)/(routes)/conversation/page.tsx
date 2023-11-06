"use client";

import * as z from "zod";
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import { usePremiumModal } from "@/hooks/usePremiumModal";
import toast from "react-hot-toast";

const ConversationPage = () => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const premiumModal = usePremiumModal();

  const submitFunc = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const res = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      console.log(res);
      setMessages((current) => [...current, userMessage, res.data]);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        premiumModal.onOpen();
      } else {
        toast.error(error?.response?.data || "Something went wrong");
      }
    } finally {
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="The most advanced conversation model"
        icon={MessageSquare}
        color="text-violet-500"
        bgcolor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitFunc)}
              className="
                    rounded-lg
                    border
                    w-full
                    p-4
                    px-3
                    md:px-6
                    focus-within:shadow-sm
                    grid
                    grid-cols-12
                    gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        placeholder="Who is Mahendra Singh Dhoni?"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="font-bold col-span-12 lg:col-span-2"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
          <div className="space-y-4 mt-4">
            {isLoading && <Loader />}
            {messages.length === 0 && !isLoading && (
              <EmptyState label="No conversation started yet" />
            )}
            <div className="flex flex-col-reverse gap-y-4">
              {messages.map((message) => (
                <div
                  key={message.content}
                  className={cn(
                    "p-8 w-full flex items-center gap-x-8 rounded-lg",
                    message.role === "user"
                      ? "bg-white border border-black/10"
                      : "bg-muted"
                  )}
                >
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <p className="text-sm">{message.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
