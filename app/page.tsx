"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { unknown, z } from "zod";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/auth/card-wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [finish, setFinish] = useState(false);

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      nama: "",
      nomborIc: "",
      umur: "",
      nomborTel: "",
      negeri: "",
      tahap: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const content = await response.json();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setFinish(true);
      form.reset();
    }
  };

  const { pending } = useFormStatus();
  return (
    <main className=" h-full w-full items-center justify-center px-8 py-12 bg-secondary">
      {finish ? (
        <CardWrapper
          label="Terima kasih kerana berdaftar dengan kami. Kami akan hubungi anda dan masukkan anda ke dalam Whatsapp Group Mengaji Online setelah siap menyemak maklumat dan dokumen anda."
          title="Terima Kasih ✅"
        >
          <div></div>
        </CardWrapper>
      ) : (
        <CardWrapper
          label="Sila masukkan butiran anda di ruangan berikut untuk mendaftar ke kelas mengaji online."
          title="Borang Pendaftaran"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input {...field} type="name" placeholder="nama" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nomborIc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombor IC</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="nombor ic" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="umur"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Umur</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="umur" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nomborTel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombor Telefon</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="nombor telefon"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="negeri"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Negeri Tempat Tinggal</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Kedah, Malaysia"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tahap"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tahap</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="tahap anda" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Iqra">Iqra</SelectItem>
                          <SelectItem value="Al Quran">Al Quran</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={pending}>
                {loading ? "Menghantar..." : "Hantar"}
              </Button>
            </form>
          </Form>
        </CardWrapper>
      )}
    </main>
  );
}
