import AbstractApi from "@/api/AbstractApi";

export interface Member {
  id: number;
  name: string;
  fatherName: string;
  motherName: string;
  cnic: string;
}

export class MemberService extends AbstractApi {
  private members = [
    {
      id: 1,
      name: "Ali Khan",
      fatherName: "Ahmed Khan",
      motherName: "Fatima Bibi",
      cnic: "35202-1234567-8",
    },
    {
      id: 2,
      name: "Sara Malik",
      fatherName: "Tariq Malik",
      motherName: "Zainab Malik",
      cnic: "35201-7654321-0",
    },
    {
      id: 3,
      name: "Bilal Ahmed",
      fatherName: "Ahmed Khan",
      motherName: "Sadia Ahmed",
      cnic: "35203-9876543-2",
    },
    {
      id: 4,
      name: "Hina Tariq",
      fatherName: "Tariq Malik",
      motherName: "Ayesha Tariq",
      cnic: "35204-2222333-1",
    },
    {
      id: 5,
      name: "Usman Ali",
      fatherName: "Farooq Ali",
      motherName: "Khadija Ali",
      cnic: "35205-4444555-9",
    },
  ];

  getAll() {
    // return this.get<{ id: string; email: string; name: string }>("/members/me");
    return this.members;
  }

  getById(id: number): Member | undefined {
    return this.members.find((m) => m.id === id);
  }

  // ✅ Update member by ID
  setById(id: number, updated: Partial<Member>): Member | undefined {
    const index = this.members.findIndex((m) => m.id === id);
    if (index === -1) return undefined;

    this.members[index] = { ...this.members[index], ...updated };
    return this.members[index];
  }

  // ✅ Delete member by ID
  deleteById(id: number): boolean {
    const index = this.members.findIndex((m) => m.id === id);
    if (index === -1) return false;

    this.members.splice(index, 1);
    return true;
  }

  create(newMember: Omit<Member, "id">): Member {
    const nextId =
      this.members.length > 0
        ? Math.max(...this.members.map((m) => m.id)) + 1
        : 1;

    const member: Member = { id: nextId, ...newMember };
    this.members.push(member);
    return member;
  }
}
