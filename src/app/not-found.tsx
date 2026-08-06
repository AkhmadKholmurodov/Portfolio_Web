"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="shell flex min-h-[70svh] flex-col justify-center py-32">
      <p className="label">404</p>
      <h1 className="display-2 mt-6 max-w-xl">{t.ui.notFound}</h1>
      <div className="mt-10">
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft />
            {t.ui.backHome}
          </Link>
        </Button>
      </div>
    </div>
  );
}
