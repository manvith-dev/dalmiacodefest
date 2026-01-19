import Team from "@/models/team.model";

const TOTAL_TEAMS = 20;

function generateTeams() {
  const teams = [];

  for (let i = 1; i <= TOTAL_TEAMS; i++) {
    teams.push({
      registrationId: `REG-${1000 + i}`,
      teamName: `Team-${i}`,
      collegeName: `College-${(i % 5) + 1}`,
      players: [
        {
          name: `Player${i}A`,
          email: `player${i}a@test.com`,
          phone: `9000000${100 + i}`,
        },
        {
          name: `Player${i}B`,
          email: `player${i}b@test.com`,
          phone: `9000000${200 + i}`,
        },
      ],
    });
  }

  return teams;
}

export async function seedMockParticipants() {
  console.log("🌱 Seeding mock participants...");

  await Team.insertMany(generateTeams());

  console.log("✅ Mock participants seeded");
}
