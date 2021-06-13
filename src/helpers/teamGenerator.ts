interface TeamProps {
  teamName: string;
}

export const generateTeam = ({ teamName }: TeamProps) => ({
  teamName,
});
