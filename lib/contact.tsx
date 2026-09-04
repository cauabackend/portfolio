import type { ComponentType } from "react";
import { FileText, Mail } from "lucide-react";
import { profile } from "@/lib/resume";

// Ícones de marca (GitHub/LinkedIn) não existem mais no lucide v1 — foram
// removidos do pacote. O path do GitHub é o mesmo do asset devicon que a esfera
// do Stack já usa (public/icons/stack/github.svg), só que com currentColor.
export type ChannelIconProps = {
  size?: number;
  className?: string;
  /** só os ícones lucide (stroke) honram; os marks fill-based ignoram */
  strokeWidth?: number;
  "aria-hidden"?: boolean;
};
export type ChannelIcon = ComponentType<ChannelIconProps>;

function GithubMark({ size = 24, className, "aria-hidden": ariaHidden }: ChannelIconProps) {
  return (
    <svg
      viewBox="0 0 128 128"
      width={size}
      height={size}
      className={className}
      aria-hidden={ariaHidden}
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
      />
    </svg>
  );
}

function LinkedinMark({ size = 24, className, "aria-hidden": ariaHidden }: ChannelIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden={ariaHidden}
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

export type ContactChannelId = "email" | "linkedin" | "github" | "cv";

export interface ContactChannel {
  id: ContactChannelId;
  label: string;
  /** texto curto sob o ícone — só o que é real; nada de handle inventado */
  handle: string;
  /** null = canal ainda sem URL real: o link simplesmente não renderiza —
   *  nada de estado "em provisionamento" (redesign 2026-09-04) */
  href: string | null;
  /** anotação estilo datasheet ao lado do rótulo (ex. "HTTPS · GIT") */
  protocol: string;
  icon: ChannelIcon;
  external: boolean;
}

// URLs: e-mail, GitHub e CV (público/cv/curriculo.pdf) são reais. LinkedIn
// segue pendente — preencher href aqui assim que o usuário passar a URL do
// perfil. Calendly foi removido do redesign (2026-09-04): o usuário não usa
// a ferramenta.
export const contactChannels: ReadonlyArray<ContactChannel> = [
  {
    id: "email",
    label: "E-mail",
    handle: profile.email,
    href: `mailto:${profile.email}`,
    protocol: "SMTP · TLS",
    icon: Mail,
    external: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "perfil profissional",
    href: null,
    protocol: "HTTPS",
    icon: LinkedinMark,
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    handle: "/cauabackend",
    href: "https://github.com/cauabackend",
    protocol: "HTTPS · GIT",
    icon: GithubMark,
    external: true,
  },
  {
    id: "cv",
    label: "CV / Currículo",
    handle: "download · pdf",
    href: "/cv/curriculo.pdf",
    protocol: "ARQUIVO · PDF",
    icon: FileText,
    external: false,
  },
];
