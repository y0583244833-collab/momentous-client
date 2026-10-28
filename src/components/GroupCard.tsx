import type { ReactNode } from "react";
import type { Group } from "../types/group.types";
import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import PeopleAltRounded from "@mui/icons-material/PeopleAltRounded";
import PhotoLibraryRounded from "@mui/icons-material/PhotoLibraryRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import UpdateRounded from "@mui/icons-material/UpdateRounded";
import ImageRounded from "@mui/icons-material/ImageRounded";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import { alpha } from "@mui/material/styles";
import { brand, gradients, liftShadow } from "../theme/tokens";
interface GroupCardProps {
  group: Group;
  isAdmin?: boolean;
}

const MetaRow = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <Stack direction="row" sx={{ alignItems: "center", gap: 1, color: "text.secondary" }}>
    <Box aria-hidden="true" sx={{ display: "inline-flex", color: brand.teal, "& svg": { fontSize: 18 } }}>{icon}</Box>
    <Typography variant="body2" component="p">{children}</Typography>
  </Stack>
);

const GroupCard = ({ group, isAdmin = false }: GroupCardProps) => {
  return (
    <Card
      component="article"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform .25s ease, box-shadow .25s ease",
        "&:hover": { transform: "translateY(-4px)", boxShadow: liftShadow }
      }}
    >
      <Box sx={{ position: "relative" }}>
        {group.coverImageUrl ? (
          <CardMedia
            component="img"
            image={group.coverImageUrl}
            alt={`תמונת הכיסוי של ${group.name}`}
            sx={{ height: 180, objectFit: "cover" }}
          />
        ) : (
          <Stack
            sx={{ alignItems: "center", justifyContent: "center", gap: 0.5, height: 180, background: gradients.placeholder, color: brand.white }}
          >
            <ImageRounded aria-hidden="true" sx={{ fontSize: 40, opacity: 0.9 }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>אין תמונת כיסוי </Typography>
          </Stack>
        )}
        <Chip
          label={group.eventTypeLabel}
          size="small"
          sx={{
            position: "absolute",
            top: 14,
            left: 14,
            backgroundColor: alpha(brand.white, 0.92),
            color: brand.tealInk,
            backdropFilter: "blur(6px)",
            boxShadow: "0 4px 12px -4px rgba(0,0,0,0.18)"
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
        <Typography variant="h2" component="h2" sx={{ fontSize: "1.25rem", mb: 1 }}>
          {group.name}
        </Typography>
        {group.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            {group.description}
          </Typography>
        )}

        <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap", mb: 2 }}>
          <Chip
            icon={<PeopleAltRounded />}
            label={<> משתתפים: {group.membersCount}</>}
            size="small"
            color="secondary"
          />
          <Chip
            icon={<PhotoLibraryRounded />}
            label={<> זיכרונות: {group.memoriesCount}</>}
            size="small"
            color="primary"
          />
        </Stack>

        <Divider sx={{ mb: 1.5, borderStyle: "dashed" }} />

        <Stack sx={{ gap: 0.75 }}>
          <MetaRow icon={<CalendarMonthRounded />}> תאריך האירוע: {group.eventDate}</MetaRow>
          <MetaRow icon={<PersonRounded />}>נוצרה על ידי: {group.creator.fullName} </MetaRow>
          <MetaRow icon={<UpdateRounded />}> פעילות אחרונה:{" "} {new Date(group.lastActivityAt).toLocaleDateString("he-IL")} </MetaRow>
        </Stack>
      </CardContent>
      {!isAdmin && (
        <CardActions sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
          <Button
            component={Link}
            to={`/groups/${group.id}`}
            variant="contained"
            color="primary"
            fullWidth
            endIcon={<ArrowBackRounded />}
          >
            כניסה לקבוצה
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default GroupCard;
