"use client"

import { useState } from "react"
import Table from "@/components/Table"
import TableSearch from "@/components/TableSearch"
import Pagination from "@/components/Pagination"
import Image from "next/image"
import Link from "next/link"

import { role } from "@/lib/data"

export type Note = {
    id: number;
    title: string;
    subject: string;
    description?: string;
    dateAdded: string;
    resourceType: 'note' | 'link' | 'file' | 'other';
    resourceUrl?: string;
}

interface NotesTableProps {
    subject?: string;
    initialNotes?: Note[];
    showSubjectColumn?: boolean;
}

const columns = [
    {
        header: "Title",
        accessor: "title",
    },
    {
        header: "Subject",
        accessor: "subject",
        className: "hidden md:table-cell",
    },
    {
        header: "Type",
        accessor: "resourceType",
        className: "hidden lg:table-cell",
    },
    {
        header: "Date Added",
        accessor: "dateAdded",
        className: "hidden md:table-cell",
    },
    {
        header: "Actions",
        accessor: "action",
    },
]

const MeasurementsTable = ({ 
    subject, 
    initialNotes = [], 
    showSubjectColumn = true 
}: NotesTableProps) => {
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newNote, setNewNote] = useState<Partial<Note>>({
        title: '',
        subject: subject || '',
        description: '',
        resourceType: 'note',
        resourceUrl: '',
    });

    // Filter columns based on showSubjectColumn prop
    const filteredColumns = showSubjectColumn 
        ? columns 
        : columns.filter(col => col.accessor !== 'subject');

    const handleAddNote = () => {
        if (!newNote.title?.trim()) return;

        const note: Note = {
            id: Date.now(),
            title: newNote.title,
            subject: newNote.subject || subject || '',
            description: newNote.description,
            dateAdded: new Date().toLocaleDateString(),
            resourceType: newNote.resourceType || 'note',
            resourceUrl: newNote.resourceUrl,
        };

        setNotes([note, ...notes]);
        setNewNote({
            title: '',
            subject: subject || '',
            description: '',
            resourceType: 'note',
            resourceUrl: '',
        });
        setShowAddForm(false);
    };

    const handleDeleteNote = (id: number) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const getResourceTypeIcon = (type: string) => {
        switch (type) {
            case 'link': return '🔗';
            case 'file': return '📁';
            case 'note': return '📝';
            default: return '📄';
        }
    };

    const renderRow = (item: Note) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-dashboardPurpleLight">
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.description && (
                        <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    )}
                </div>
            </td>

            {showSubjectColumn && (
                <td className="hidden md:table-cell">{item.subject}</td>
            )}
            
            <td className="hidden lg:table-cell">
                <span className="flex items-center gap-1">
                    {getResourceTypeIcon(item.resourceType)}
                    <span className="capitalize">{item.resourceType}</span>
                </span>
            </td>
            
            <td className="hidden md:table-cell">{item.dateAdded}</td>

            <td>
                <div className="flex items-center gap-2">
                    {item.resourceUrl ? (
                        <Link href={item.resourceUrl} target="_blank" rel="noopener noreferrer">
                            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-dashboardSky">
                                <Image src="/view.png" alt="View" width={16} height={16} />
                            </button>
                        </Link>
                    ) : (
                        <Link href={`/notes/${item.id}`}>
                            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-dashboardSky">
                                <Image src="/edit.png" alt="Edit" width={16} height={16} />
                            </button>
                        </Link>
                    )}

                    <button 
                        onClick={() => handleDeleteNote(item.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-full bg-dashboardPurple"
                    >
                        <Image src="/delete.png" alt="Delete" width={16} height={16} />
                    </button>
                </div>
            </td>
        </tr>
    );

    return (
        <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className="flex items-center justify-between mb-4"> 
                <h1 className="hidden md:block text-lg font-semibold">
                    {subject ? `${subject} Measurements` : 'Measurements'}
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-dashboardYellow">
                            <Image src="/filter.png" alt="Filter" width={14} height={14} />
                        </button>

                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-dashboardYellow">
                            <Image src="/sort.png" alt="Sort" width={14} height={14} />
                        </button>

                        <button 
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-dashboardYellow"
                        >
                            <Image src="/plus.png" alt="Add" width={14} height={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ADD NOTE FORM */}
            {showAddForm && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4 border">
                    <h3 className="font-semibold mb-3">Add New Note/Resource</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title *</label>
                            <input
                                type="text"
                                value={newNote.title || ''}
                                onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                                className="w-full p-2 border rounded-md"
                                placeholder="Enter title"
                            />
                        </div>

                        {!subject && (
                            <div>
                                <label className="block text-sm font-medium mb-1">Subject</label>
                                <input
                                    type="text"
                                    value={newNote.subject || ''}
                                    onChange={(e) => setNewNote({...newNote, subject: e.target.value})}
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Enter subject"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-1">Type</label>
                            <select
                                value={newNote.resourceType || 'note'}
                                onChange={(e) => setNewNote({...newNote, resourceType: e.target.value as Note['resourceType']})}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="note">Note</option>
                                <option value="link">Link</option>
                                <option value="file">File</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="md:col-span-2 lg:col-span-3">
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                value={newNote.description || ''}
                                onChange={(e) => setNewNote({...newNote, description: e.target.value})}
                                className="w-full p-2 border rounded-md"
                                placeholder="Enter description (optional)"
                                rows={2}
                            />
                        </div>

                        <div className="md:col-span-2 lg:col-span-3">
                            <label className="block text-sm font-medium mb-1">Resource URL (optional)</label>
                            <input
                                type="url"
                                value={newNote.resourceUrl || ''}
                                onChange={(e) => setNewNote({...newNote, resourceUrl: e.target.value})}
                                className="w-full p-2 border rounded-md"
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={handleAddNote}
                            className="px-4 py-2 bg-dashboardPurple text-white rounded-md hover:bg-dashboardPurple/90"
                        >
                            Add Note
                        </button>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* LIST */}
            <Table columns={filteredColumns} renderRow={renderRow} data={notes}/>
            
            {/* PAGINATION */}
            <Pagination />
        </div>
    );
};

export default MeasurementsTable;