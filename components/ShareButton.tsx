import React, { useState, useEffect, useRef } from 'react';
import { 
  ShareIcon, 
  LinkIcon, 
  CheckIcon, 
  PaperAirplaneIcon, 
  ArrowTopRightOnSquareIcon 
} from '@heroicons/react/24/outline';

export default function ShareButton({ url, title, text = "Check this out!" }: {url: string, title:string, text?: string}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef(null);

  // State to hold client-only window properties safely
  const [shareData, setShareData] = useState({
    url: url || '',
    title: title || ''
  });

  // useEffect(() => {
  //   // This runs strictly on the client, making it safe to access window/document
  //   setShareData({
  //     url: url || window.location.href,
  //     title: title || document.title
  //   });

  //   // Close dropdown when clicking outside
  //   function handleClickOutside(event) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, [url, title]);

  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ 
          title: shareData.title, 
          text: text, 
          url: shareData.url 
        });
        return;
      } catch (err) {
        console.log(err)
        // if (err.name !== 'AbortError') console.error('Share failed:', err);
      }
    }
    setIsOpen(!isOpen);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const encodedUrl = encodeURIComponent(shareData.url);
  const encodedText = encodeURIComponent(`${text} ${shareData.url}`);

  const fallbackTargets = [
    {
      name: 'Telegram',
      icon: <PaperAirplaneIcon className="w-4 h-4 text-sky-500" />,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(text)}`,
    },
    {
      name: 'WhatsApp',
      icon: <PaperAirplaneIcon className="w-4 h-4 text-emerald-500 rotate-45" />,
      href: `https://api.whatsapp.com/send?text=${encodedText}`,
    },
    {
      name: 'LinkedIn',
      icon: <ArrowTopRightOnSquareIcon className="w-4 h-4 text-blue-700" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Facebook',
      icon: <ArrowTopRightOnSquareIcon className="w-4 h-4 text-blue-600" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <ShareIcon className="w-4 h-4" />
        Share
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-gray-100 bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 dark:bg-gray-900 dark:border-gray-800">
          <div className="p-1.5 space-y-0.5">
            <button
              onClick={handleCopyLink}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-gray-500" />
                <span>Copy Link</span>
              </div>
              {copied ? (
                <CheckIcon className="w-4 h-4 text-emerald-500" />
              ) : (
                <span className="text-xs text-gray-400">Ctrl+C</span>
              )}
            </button>

            <div className="my-1 border-t border-gray-100 dark:border-gray-800" />

            {fallbackTargets.map((target) => (
              <a
                key={target.name}
                href={target.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {target.icon}
                <span>Share to {target.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
