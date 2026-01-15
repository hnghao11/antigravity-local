"use client";

import { Document } from "@/services/docService";
import { GlassCard } from "@/components/ui/glass-card";
import { FileText, MoreVertical, Calendar, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DocumentCardProps {
  doc: Document;
  onDelete?: (id: number) => void;
  onToggleFavorite?: (id: number) => void;
}

export function DocumentCard({ doc, onDelete, onToggleFavorite }: DocumentCardProps) {
  return (
    <Link href={`/editor/${doc.id}`} passHref>
      <div className="h-full flex flex-col justify-between group cursor-pointer bg-card border border-border hover:border-primary/50 hover:shadow-sm transition-all duration-200 rounded-xl p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className={cn(
                "p-2 rounded-lg transition-colors",
                doc.isFavorite 
                    ? "text-orange-500 bg-orange-500/10" 
                    : "text-muted-foreground bg-muted group-hover:text-primary group-hover:bg-primary/10"
            )}>
              {doc.isFavorite ? <Star className="w-5 h-5 fill-current" /> : <FileText className="w-5 h-5" />}
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite?.(doc.id);
                }}>
                  {doc.isFavorite ? "Unfavorite" : "Favorite"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive cursor-pointer" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(doc.id);
                }}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div>
            <h3 className="font-semibold text-base text-foreground line-clamp-1 mb-2 group-hover:text-primary transition-colors">
              {doc.title || "Untitled Document"}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 h-[4.5em]">
              {doc.content 
                ? doc.content.replace(/[#*`]/g, '').substring(0, 100) 
                : "No content preview available..."}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
            </div>
             <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{new Date(doc.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
        </div>
      </div>
    </Link>
  );
}
