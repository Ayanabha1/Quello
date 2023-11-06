"use client";

import * as z from "zod";
import Heading from "@/components/Heading";
import { MessageSquare, MusicIcon, VideoIcon } from "lucide-react";
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
  const [video, setVideo] = useState<string>();
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
      setVideo(undefined);
      const res = await axios.post("/api/video", values);
      setVideo(res.data[0]);
      form.reset();
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
        title="Video Generation"
        description="Turn your imagination into video"
        icon={VideoIcon}
        color="text-orange-700"
        bgcolor="bg-orange-500/10"
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
                        placeholder="Horse riding on a donkey"
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
            {!video && !isLoading && (
              <EmptyState label="No video generated yet" />
            )}
            <div className="flex flex-col gap-y-4">
              {video && (
                <video
                  className="w-full aspect-video mt-8 rounded-lg border bg-black"
                  controls
                >
                  <source src={video} />
                </video>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
