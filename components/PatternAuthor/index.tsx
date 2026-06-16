import Image from "next/image";

import {
  UserIcon,
} from "@heroicons/react/24/solid";

import { Author } from "@/lib/interfaces";


export default function PatternAuthor({author}: {author: Author}) {
    return (
        <div className="flex items-center gap-3 mb-5">
              <div
                className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0"
              >
                {author.profilePicture ? (
                  <Image
                    src={author.profilePicture}
                    alt={author.fullName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <UserIcon className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <div className="text-sm">
                <span className="text-slate-400 block text-xs font-medium uppercase tracking-wider">
                  Автор мастер-класса
                </span>
                <span
                  className="font-semibold text-slate-800"
                >
                  {author.fullName}
                </span>
              </div>
            </div>
    )
}
