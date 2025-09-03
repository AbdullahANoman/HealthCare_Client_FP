"use client"
import { useState } from "react"
import { Box, Chip, IconButton, Typography, Paper, Grid, Divider } from "@mui/material"
import { DataGrid, type GridColDef } from "@mui/x-data-grid"
import VisibilityIcon from "@mui/icons-material/Visibility"
import CloseIcon from "@mui/icons-material/Close"
import PersonIcon from "@mui/icons-material/Person"
import PhoneIcon from "@mui/icons-material/Phone"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import { useGetAllPrescriptionsQuery } from "@/redux/api/prescriptionApi" // Updated import

// Define types for your prescription data
interface Doctor {
  name: string;
  qualification: string;
  designation: string;
  currentWorkingPlace: string;
  contactNumber: string;
  address: string;
}

interface Patient {
  name: string;
  email: string;
  contactNumber: string;
  address: string;
}

interface Appointment {
  paymentStatus: string;
}

interface Prescription {
  id: string;
  doctor: Doctor;
  patient: Patient;
  appointment: Appointment;
  instructions: string;
  createdAt: string;
  followUpDate: string;
}

const PrescriptionPage = () => {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)
  const { data, isLoading } = useGetAllPrescriptionsQuery({})

  // Handle potential undefined data
  const prescriptions: Prescription[] = data?.prescriptions?.data || data?.prescriptions || []

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>/g, "").trim()
  }

  const columns: GridColDef[] = [
    {
      field: "doctorName",
      headerName: "Doctor Name",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="body2" fontWeight="medium">
              {row.doctor?.name || "N/A"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {row.doctor?.qualification || ""}
            </Typography>
          </Box>
        )
      },
    },
    {
      field: "patientName",
      headerName: "Patient Name",
      flex: 1,
      renderCell: ({ row }) => {
        return row.patient?.name || "N/A"
      },
    },
    {
      field: "prescriptionDate",
      headerName: "Prescription Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return formatDate(row.createdAt)
      },
    },
    {
      field: "followUpDate",
      headerName: "Follow-up Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => {
        return formatDate(row.followUpDate)
      },
    },
    {
      field: "instructions",
      headerName: "Instructions",
      flex: 1.5,
      renderCell: ({ row }) => {
        return (
          <Typography variant="body2" noWrap>
            {stripHtmlTags(row.instructions || "")}
          </Typography>
        )
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        const paymentStatus = row.appointment?.paymentStatus || "UNKNOWN"
        return (
          <Chip
            label={paymentStatus}
            color={paymentStatus === "PAID" ? "success" : "error"}
            size="small"
          />
        )
      },
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton onClick={() => setSelectedPrescription(row)} color="primary">
            <VisibilityIcon />
          </IconButton>
        )
      },
    },
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Prescriptions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View and manage your medical prescriptions
        </Typography>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={prescriptions}
            columns={columns}
            loading={isLoading}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            disableRowSelectionOnClick
            getRowId={(row) => row.id || Math.random().toString()} // Ensure unique ID
          />
        </Box>
      </Paper>

      {selectedPrescription && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" component="h2">
              Prescription Details
            </Typography>
            <IconButton onClick={() => setSelectedPrescription(null)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Grid container spacing={3}>
            {/* Doctor Information */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <PersonIcon />
                  Doctor Information
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Name:</strong> {selectedPrescription.doctor?.name || "N/A"}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Qualification:</strong> {selectedPrescription.doctor?.qualification || "N/A"}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Designation:</strong> {selectedPrescription.doctor?.designation || "N/A"}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Workplace:</strong> {selectedPrescription.doctor?.currentWorkingPlace || "N/A"}
                  </Typography>
                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <PhoneIcon fontSize="small" />
                    {selectedPrescription.doctor?.contactNumber || "N/A"}
                  </Typography>
                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon fontSize="small" />
                    {selectedPrescription.doctor?.address || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Patient Information */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <PersonIcon />
                  Patient Information
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Name:</strong> {selectedPrescription.patient?.name || "N/A"}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Email:</strong> {selectedPrescription.patient?.email || "N/A"}
                  </Typography>
                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <PhoneIcon fontSize="small" />
                    {selectedPrescription.patient?.contactNumber || "N/A"}
                  </Typography>
                  <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon fontSize="small" />
                    {selectedPrescription.patient?.address || "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Prescription Instructions */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Prescription Instructions
            </Typography>
            <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
              <div dangerouslySetInnerHTML={{ __html: selectedPrescription.instructions || "No instructions provided" }} />
            </Paper>
          </Box>

          {/* Appointment Details */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">
                Prescribed Date
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {formatDate(selectedPrescription.createdAt)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">
                Follow-up Date
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {formatDate(selectedPrescription.followUpDate)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="caption" color="text.secondary">
                Payment Status
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Chip
                  label={selectedPrescription.appointment?.paymentStatus || "UNKNOWN"}
                  color={selectedPrescription.appointment?.paymentStatus === "PAID" ? "success" : "error"}
                  size="small"
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  )
}

export default PrescriptionPage