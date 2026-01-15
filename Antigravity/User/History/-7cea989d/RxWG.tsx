"use client";

import Link from "next/link";
import { FileText, Plus, Clock, Star, TrendingUp, Loader2, AlertCircle, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import * as docService from "@/services/docService";
import { useEffect, useState } from "react";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { motion } from "framer-motion";
import { Document } from "@/services/docService";
import { toast } from "react-hot-toast";
import { AnimatedBackground } from "@/components/ui/animated-background";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function DashboardPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch documents on mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const docs = await docService.listDocuments();
        setDocuments(docs);
      } catch (err: any) {
        console.error("Failed to fetch documents:", err);
        setError(err.message || "Failed to load documents");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  async function handleDelete(id: number) {
    setDeleteId(id);
  }

  async function handleConfirmDelete() {
    if (deleteId === null) return;
    try {
      setIsDeleting(true);
      await docService.deleteDocument(deleteId);
      setDocuments(documents.filter(d => d.id !== deleteId));
      toast.success("Document deleted");
    } catch (error) {
      console.error("Failed to delete document", error);
      toast.error("Failed to delete document");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  }

  async function handleToggleFavorite(id: number) {
    const doc = documents.find(d => d.id === id);
    if (!doc) return;
    try {
      const updated = await docService.updateDocument(id, { isFavorite: !doc.isFavorite });
      setDocuments(documents.map(d => d.id === id ? updated : d));
    } catch (error) {
       console.error("Failed to update favorite status", error);
       toast.error("Failed to update favorite status");
    }
  }

  const recentDocuments = documents.slice(0, 4);
  const favoriteCount = documents.filter((doc) => doc.isFavorite).length;
  const draftCount = documents.filter((doc) => doc.status === "draft").length;
  
  const stats = [
    { 
      label: "Total Documents", 
      value: documents.length.toString(), 
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-800"
    },
    { 
      label: "Favorites", 
      value: favoriteCount.toString(), 
      icon: Star, 
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-200 dark:border-orange-800"
    },
    { 
      label: "Drafts", 
      value: draftCount.toString(), 
      icon: TrendingUp, 
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-800"
    },
  ];

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto space-y-8 relative">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Dashboard
            </h2>
            <p className="text-muted-foreground mt-1">
              Welcome back to your workspace.
            </p>
          </div>
          <Button 
              asChild
              className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-150 font-medium shadow-sm"
          >
            <Link href="/editor/new">
              <Plus className="mr-2 h-4 w-4" />
              <span className="font-semibold">New Document</span>
            </Link>
          </Button>
        </motion.div>

        {/* Stats Grid - Minimalist */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={item}>
              <div className="bg-card hover:bg-accent/5 transition-colors duration-150 rounded-xl p-6 border border-border shadow-sm">
                  <div className="flex items-start justify-between">
                      <div>
                          <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                          <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                          <stat.icon className="h-5 w-5" />
                      </div>
                  </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      {/* Error State */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
            <div className="flex items-start gap-3 text-destructive">
                <AlertCircle className="h-5 w-5 mt-0.5" />
                <div>
                    <h3 className="font-semibold">Error</h3>
                    <p className="text-sm opacity-90">{error}</p>
                </div>
            </div>
        </div>
      )}

      {/* Recent Documents Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold flex items-center gap-2 text-foreground">
                <Clock className="h-5 w-5 text-muted-foreground" />
                Recent Activity
            </h3>
            {documents.length > 0 && (
                <Link
                href="/documents"
                className="group flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-150"
                >
                View all
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
                </Link>
            )}
        </div>

        {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
                ))}
            </div>
        ) : documents.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-muted rounded-xl bg-card/50">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">No documents yet</h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                    Your workspace is looking a bit empty. Create your first document to get started!
                </p>
                <Button asChild className="cursor-pointer">
                    <Link href="/editor/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Create First Document
                    </Link>
                </Button>
            </div>
        ) : (
            <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {recentDocuments.map((doc) => (
                    <motion.div key={doc.id} variants={item}>
                        <DocumentCard 
                          doc={doc} 
                          onDelete={handleDelete}
                          onToggleFavorite={handleToggleFavorite}
                        />
                    </motion.div>
                ))}
            </motion.div>
        )}
      </div>

      <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete document</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this document? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isDeleting}>
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </>
  );
}
