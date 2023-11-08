"use client";

import * as z from "zod";
import Heading from "@/components/Heading";
import { CodeIcon, MessageSquare } from "lucide-react";
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
import ReactMarkdown from "react-markdown";
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
  const premiumModal = usePremiumModal();
  const router = useRouter();
  const submitFunc = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      const res = await axios.post("/api/code", {
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
        title="Code Generation"
        description="Generate codes using descriptive text"
        icon={CodeIcon}
        color="text-green-700"
        bgcolor="bg-green-700/10"
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
                        placeholder="Find next greater elements in an array using c++"
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
                  <div className="flex flex-col-reverse h-full">
                    {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  </div>
                  <div className="flex w-full">
                    <p className="text-sm w-full p-2">
                      <ReactMarkdown
                        components={{
                          pre: ({ node, ...props }) => (
                            <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                              <pre {...props} />
                            </div>
                          ),
                          code: ({ node, ...props }) => (
                            <code
                              className="bg-black-10 rounded-lg p-1 w-[90%]"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </p>
                  </div>
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