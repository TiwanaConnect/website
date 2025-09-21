export interface Member {
  id: number;
  name: string;
  fatherName: string;
  motherName: string;
  cnic: string;
}
const members = [
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

export class MemberService {
  getAll() {
    return members;
  }

  getById(id: number): Member | undefined {
    return members.find((m) => m.id === id);
  }

  // ✅ Update member by ID
  setById(id: number, updated: Partial<Member>): Member | undefined {
    const index = members.findIndex((m) => m.id === id);
    if (index === -1) return undefined;

    members[index] = { ...members[index], ...updated };
    return members[index];
  }

  // ✅ Delete member by ID
  deleteById(id: number): boolean {
    const index = members.findIndex((m) => m.id === id);
    if (index === -1) return false;

    members.splice(index, 1);
    return true;
  }

  create(newMember: Omit<Member, "id">): Member {
    const nextId =
      members.length > 0 ? Math.max(...members.map((m) => m.id)) + 1 : 1;

    const member: Member = { id: nextId, ...newMember };
    members.push(member);
    return member;
  }
}
