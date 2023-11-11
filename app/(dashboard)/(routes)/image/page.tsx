"use client";

import * as z from "zod";
import Heading from "@/components/Heading";
import { Download, ImageIcon, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { amountOptions, formSchema, resolutionOptions } from "./constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import EmptyState from "@/components/EmptyState";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { usePremiumModal } from "@/hooks/usePremiumModal";
import toast from "react-hot-toast";
import { useOpenAIKeyModal } from "@/hooks/useOpenAIKeyModal";
import { isOpenAiKeyPresent } from "@/lib/openAiKey";

const ImageGeneration = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const premiumModal = usePremiumModal();
  const openAIApIKeyModal = useOpenAIKeyModal();

  const router = useRouter();
  const submitFunc = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    if (!isOpenAiKeyPresent()) {
      openAIApIKeyModal.onOpen();
      setIsLoading(false);
      return;
    }

    try {
      const apiKey = localStorage.getItem("OPENAI_API_KEY");
      setImages([]);
      console.log(values);
      const res = await axios.post("/api/image", {
        ...values,
        clientApiKey: apiKey,
      });
      const urls = res.data.map((image: { url: string }) => image.url);
      setImages(urls);
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
        title="Image Genearation"
        description="Generate images using descriptive text"
        icon={ImageIcon}
        color="text-pink-700"
        bgcolor="bg-pink-700/10"
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        placeholder="A cat wearing nasa space suit standing on mars soil"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((op) => (
                          <SelectItem key={op.value} value={op.value}>
                            {op.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((op) => (
                          <SelectItem key={op.value} value={op.value}>
                            {op.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            {images.length === 0 && !isLoading && (
              <EmptyState label="No conversation started yet" />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
              {images.map((image) => (
                <Card key={image} className="rounded-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <Image alt="Image" fill src={image} />
                  </div>
                  <CardFooter className="p-2">
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => window.open(image)}
                    >
                      <Download className="h-4 mr-2 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneration;
