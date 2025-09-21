"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronsUpDown } from "lucide-react";
import { MemberService } from "@/api/services/member";
import { FormEvent, useEffect, useState } from "react";

// ---------------- Member type ----------------
type Member = {
  id: number;
  name: string;
  fatherName: string;
  motherName: string;
  cnic: string;
};

// ---------------- Component ----------------
export default function MembersPage() {
  const memberService = React.useMemo(() => new MemberService(), []);
  // State
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchedMembers = memberService.getAll();
    setMembers(fetchedMembers);
  }, []);

  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [open, setOpen] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting] = useState<SortingState>([]);

  // ---------------- Columns ----------------
  const columns: ColumnDef<Member>[] = [
    { accessorKey: "name", header: "Name", filterFn: "includesString" },
    { accessorKey: "fatherName", header: "Father Name" },
    { accessorKey: "motherName", header: "Mother Name" },
    { accessorKey: "cnic", header: "CNIC", filterFn: "includesString" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const member = row.original;
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEdit(member)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(member.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  // ---------------- Table setup ----------------
  const table = useReactTable({
    data: members,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // ---------------- Handlers ----------------
  function handleDelete(id: number) {
    memberService.deleteById(id);
    setMembers([...memberService.getAll()]);
  }

  function handleEdit(member: Member) {
    setEditingMember(member);
    setOpen(true);
  }

  function handleCreate() {
    setEditingMember(null);
    setOpen(true);
  }

  function handleSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMember: Member = {
      id: editingMember ? editingMember.id : Date.now(),
      name: formData.get("name") as string,
      fatherName: formData.get("fatherName") as string,
      motherName: formData.get("motherName") as string,
      cnic: formData.get("cnic") as string,
    };

    if (editingMember) {
      memberService.setById(editingMember.id, newMember);
    } else {
      memberService.create(newMember);
    }
    setMembers([...memberService.getAll()]);

    setOpen(false);
  }

  // Get unique father names
  const fatherNames = Array.from(new Set(members.map((m) => m.fatherName)));

  // Current filter value
  const selectedFather =
    (table.getColumn("fatherName")?.getFilterValue() as string) ?? "";

  const [popoverOpen, setPopoverOpen] = useState(false);

  // ---------------- Render ----------------
  return (
    <div className="p-6  flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Members Management</h1>
        <Button onClick={handleCreate}>Create Member</Button>
      </div>

      {/* 🔎 Autocomplete Filter */}
      <div className="flex items-center gap-2">
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-[250px] justify-between"
            >
              {selectedFather || "Filter by Father Name"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder="Search father name..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {fatherNames.map((name) => (
                    <CommandItem
                      key={name}
                      value={name}
                      onSelect={(value: unknown) => {
                        table.getColumn("fatherName")?.setFilterValue(value);
                        setOpen(false);
                      }}
                    >
                      {name}
                    </CommandItem>
                  ))}
                  {/* Clear filter option */}
                  <CommandItem
                    value="all"
                    onSelect={() => {
                      table.getColumn("fatherName")?.setFilterValue("");
                      setOpen(false);
                    }}
                  >
                    Clear filter
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {/* Search by CNIC */}
        <Input
          placeholder="Search by CNIC..."
          value={(table.getColumn("cnic")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("cnic")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog for create/edit */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingMember ? "Edit Member" : "Create Member"}
            </DialogTitle>
            <DialogDescription>
              Fill in the member details below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={editingMember?.name}
                required
              />
            </div>
            <div>
              <Label htmlFor="fatherName">Father Name</Label>
              <Input
                id="fatherName"
                name="fatherName"
                defaultValue={editingMember?.fatherName}
                required
              />
            </div>
            <div>
              <Label htmlFor="motherName">Mother Name</Label>
              <Input
                id="motherName"
                name="motherName"
                defaultValue={editingMember?.motherName}
                required
              />
            </div>
            <div>
              <Label htmlFor="cnic">CNIC</Label>
              <Input
                id="cnic"
                name="cnic"
                defaultValue={editingMember?.cnic}
                required
              />
            </div>

            <DialogFooter>
              <Button type="submit">
                {editingMember ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
