import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  StickyNote,
  Plus,
  Search,
  Edit3,
  Trash2,
  Save,
  X,
  Tag,
  Calendar,
  Pin,
  PinOff,
  Download,
  Upload,
  Type,
  List,
  Code,
  Quote,
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
  moduleId?: string;
  lessonId?: string;
  color: string;
}

interface NoteTakerProps {
  moduleId?: string;
  lessonId?: string;
  className?: string;
}

const NoteTaker: React.FC<NoteTakerProps> = ({
  moduleId,
  lessonId,
  className = "",
}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tags: [] as string[],
    color: "#ffffff",
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const noteColors = [
    "#ffffff",
    "#fef3c7",
    "#fed7d7",
    "#d1fae5",
    "#dbeafe",
    "#e0e7ff",
    "#fce7f3",
    "#f3e8ff",
    "#ecfdf5",
    "#f0f9ff",
  ];

  useEffect(() => {
    // Load notes from localStorage
    const savedNotes = localStorage.getItem("ml-course-notes");
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
      setNotes(parsedNotes);
    }
  }, []);

  useEffect(() => {
    // Save notes to localStorage
    localStorage.setItem("ml-course-notes", JSON.stringify(notes));
  }, [notes]);

  const createNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
      moduleId,
      lessonId,
      color: newNote.color,
    };

    setNotes((prev) => [note, ...prev]);
    setNewNote({ title: "", content: "", tags: [], color: "#ffffff" });
    setIsCreating(false);
  };

  const updateNote = (updatedNote: Note) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === updatedNote.id
          ? { ...updatedNote, updatedAt: new Date() }
          : note,
      ),
    );
    setEditingNote(null);
  };

  const deleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  const togglePin = (noteId: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId
          ? { ...note, isPinned: !note.isPinned, updatedAt: new Date() }
          : note,
      ),
    );
  };

  const addTag = (noteId: string, tag: string) => {
    if (!tag.trim()) return;

    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId
          ? {
              ...note,
              tags: [...new Set([...note.tags, tag.trim()])],
              updatedAt: new Date(),
            }
          : note,
      ),
    );
  };

  const removeTag = (noteId: string, tagToRemove: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId
          ? {
              ...note,
              tags: note.tags.filter((tag) => tag !== tagToRemove),
              updatedAt: new Date(),
            }
          : note,
      ),
    );
  };

  const exportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ml-course-notes.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedNotes = JSON.parse(e.target?.result as string);
        const processedNotes = importedNotes.map((note: any) => ({
          ...note,
          id: Date.now().toString() + Math.random(),
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }));
        setNotes((prev) => [...processedNotes, ...prev]);
      } catch (error) {
        console.error("Failed to import notes:", error);
      }
    };
    reader.readAsText(file);
  };

  const insertMarkdown = (syntax: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    let newText = "";
    let newCursorPos = start;

    switch (syntax) {
      case "bold":
        newText = `${before}**${selected}**${after}`;
        newCursorPos = start + 2 + selected.length + 2;
        break;
      case "italic":
        newText = `${before}_${selected}_${after}`;
        newCursorPos = start + 1 + selected.length + 1;
        break;
      case "code":
        newText = `${before}\`${selected}\`${after}`;
        newCursorPos = start + 1 + selected.length + 1;
        break;
      case "list":
        newText = `${before}- ${selected}${after}`;
        newCursorPos = start + 2 + selected.length;
        break;
      case "quote":
        newText = `${before}> ${selected}${after}`;
        newCursorPos = start + 2 + selected.length;
        break;
      default:
        return;
    }

    if (editingNote) {
      setEditingNote({ ...editingNote, content: newText });
    } else {
      setNewNote({ ...newNote, content: newText });
    }

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const allTags = [...new Set(notes.flatMap((note) => note.tags))];

  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => note.tags.includes(tag));
      const matchesContext = !moduleId || note.moduleId === moduleId;
      return matchesSearch && matchesTags && matchesContext;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-6 transition-smooth ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white">
            <StickyNote className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black">Notes</h3>
            <p className="text-xs text-gray-500">
              {notes.length} notes • {allTags.length} tags
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept=".json"
            onChange={importNotes}
            className="hidden"
            id="import-notes"
          />
          <Button
            onClick={() => document.getElementById("import-notes")?.click()}
            variant="outline"
            size="sm"
            className="p-2"
            title="Import notes"
          >
            <Upload className="w-4 h-4" />
          </Button>
          <Button
            onClick={exportNotes}
            variant="outline"
            size="sm"
            className="p-2"
            title="Export notes"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-black text-white font-medium py-2 px-4 rounded-lg transition-smooth interactive-element"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-gray-300 transition-smooth"
          />
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-smooth interactive-element ${
                  selectedTags.includes(tag)
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  setSelectedTags((prev) =>
                    prev.includes(tag)
                      ? prev.filter((t) => t !== tag)
                      : [...prev, tag],
                  );
                }}
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Create Note Form */}
      {isCreating && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-gray-300 transition-smooth"
            />

            {/* Markdown Toolbar */}
            <div className="flex items-center space-x-2 p-2 bg-white border border-gray-200 rounded-lg">
              <Button
                onClick={() => insertMarkdown("bold")}
                variant="outline"
                size="sm"
                className="p-2"
                title="Bold (**text**)"
              >
                <Type className="w-3 h-3" />
              </Button>
              <Button
                onClick={() => insertMarkdown("italic")}
                variant="outline"
                size="sm"
                className="p-2"
                title="Italic (_text_)"
              >
                <Type className="w-3 h-3 italic" />
              </Button>
              <Button
                onClick={() => insertMarkdown("code")}
                variant="outline"
                size="sm"
                className="p-2"
                title="Code (`code`)"
              >
                <Code className="w-3 h-3" />
              </Button>
              <Button
                onClick={() => insertMarkdown("list")}
                variant="outline"
                size="sm"
                className="p-2"
                title="List (- item)"
              >
                <List className="w-3 h-3" />
              </Button>
              <Button
                onClick={() => insertMarkdown("quote")}
                variant="outline"
                size="sm"
                className="p-2"
                title="Quote (> text)"
              >
                <Quote className="w-3 h-3" />
              </Button>
            </div>

            <textarea
              ref={textareaRef}
              placeholder="Write your note... (Supports markdown)"
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-gray-300 transition-smooth"
              rows={4}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Color:</span>
                <div className="flex space-x-1">
                  {noteColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewNote({ ...newNote, color })}
                      className={`w-6 h-6 rounded border-2 transition-smooth ${
                        newNote.color === color
                          ? "border-black"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => setIsCreating(false)}
                  variant="outline"
                  size="sm"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={createNote}
                  className="bg-black text-white"
                  size="sm"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Note
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="border border-gray-200 rounded-lg p-4 transition-smooth card-interactive"
            style={{ backgroundColor: note.color }}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-sm font-semibold text-black truncate flex-1">
                {note.title}
              </h4>
              <div className="flex items-center space-x-1 ml-2">
                <Button
                  onClick={() => togglePin(note.id)}
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                >
                  {note.isPinned ? (
                    <Pin className="w-3 h-3 text-blue-500" />
                  ) : (
                    <PinOff className="w-3 h-3 text-gray-400" />
                  )}
                </Button>
                <Button
                  onClick={() => setEditingNote(note)}
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                >
                  <Edit3 className="w-3 h-3 text-gray-400" />
                </Button>
                <Button
                  onClick={() => deleteNote(note.id)}
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto"
                >
                  <Trash2 className="w-3 h-3 text-red-400" />
                </Button>
              </div>
            </div>

            <p className="text-xs text-gray-600 mb-3 line-clamp-3">
              {note.content}
            </p>

            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {note.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{note.createdAt.toLocaleDateString()}</span>
              {note.updatedAt > note.createdAt && (
                <span>Updated {note.updatedAt.toLocaleDateString()}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <StickyNote className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No notes found
          </h3>
          <p className="text-gray-500">
            {searchTerm || selectedTags.length > 0
              ? "Try adjusting your search or filters."
              : "Start taking notes to track your learning progress."}
          </p>
        </div>
      )}

      {/* Edit Note Modal - Simple inline for now */}
      {editingNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Edit Note</h3>
              <Button
                onClick={() => setEditingNote(null)}
                variant="ghost"
                size="sm"
                className="p-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={editingNote.title}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-gray-300 transition-smooth"
              />

              <textarea
                value={editingNote.content}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, content: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-100 focus:border-gray-300 transition-smooth"
                rows={6}
              />

              <div className="flex justify-end space-x-2">
                <Button onClick={() => setEditingNote(null)} variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={() => updateNote(editingNote)}
                  className="bg-black text-white"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteTaker;
