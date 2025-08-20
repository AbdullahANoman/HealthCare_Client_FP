"use client"

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
} from "@mui/material"
import {
  People,
  LocalHospital,
  TrendingUp,
  AttachMoney,
  Analytics,
  PersonAdd,
  Settings,
  Assessment,
} from "@mui/icons-material"

const  AdminPage =()=> {
  const systemStats = {
    totalUsers: 1247,
    activeDoctors: 89,
    totalAppointments: 3456,
    monthlyRevenue: 125000,
  }

  const recentActivities = [
    { id: 1, action: "New doctor registered", user: "Dr. Sarah Wilson", time: "2 hours ago", status: "success" },
    { id: 2, action: "Payment processed", user: "John Doe", time: "3 hours ago", status: "success" },
    { id: 3, action: "Appointment cancelled", user: "Emma Johnson", time: "5 hours ago", status: "warning" },
    { id: 4, action: "System maintenance", user: "System", time: "1 day ago", status: "info" },
  ]

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a1a1a", mb: 1 }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" sx={{ color: "#666", mb: 3 }}>
          Monitor and manage your healthBridge platform
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {systemStats.totalUsers.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Users
                  </Typography>
                </Box>
                <People sx={{ fontSize: 40, opacity: 0.8 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", color: "white" }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {systemStats.activeDoctors}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Active Doctors
                  </Typography>
                </Box>
                <LocalHospital sx={{ fontSize: 40, opacity: 0.8 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", color: "white" }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {systemStats.totalAppointments.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Total Appointments
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", color: "white" }}>
            <CardContent>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    ${systemStats.monthlyRevenue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Monthly Revenue
                  </Typography>
                </Box>
                <AttachMoney sx={{ fontSize: 40, opacity: 0.8 }} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Recent Activities
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Action</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>{activity.action}</TableCell>
                        <TableCell>{activity.user}</TableCell>
                        <TableCell>{activity.time}</TableCell>
                        <TableCell>
                          <Chip
                            label={activity.status}
                            size="small"
                            color={
                              activity.status === "success"
                                ? "success"
                                : activity.status === "warning"
                                  ? "warning"
                                  : "info"
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Admin Actions
              </Typography>
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<PersonAdd />}
                  fullWidth
                  sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    py: 1.5,
                  }}
                >
                  Add New Doctor
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Analytics />}
                  fullWidth
                  sx={{ py: 1.5, borderColor: "#667eea", color: "#667eea" }}
                >
                  View Analytics
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Assessment />}
                  fullWidth
                  sx={{ py: 1.5, borderColor: "#667eea", color: "#667eea" }}
                >
                  Generate Reports
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Settings />}
                  fullWidth
                  sx={{ py: 1.5, borderColor: "#667eea", color: "#667eea" }}
                >
                  System Settings
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* System Health */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                System Health
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Server Performance
                    </Typography>
                    <LinearProgress variant="determinate" value={85} sx={{ mb: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                      85% - Good
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Database Health
                    </Typography>
                    <LinearProgress variant="determinate" value={92} sx={{ mb: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                      92% - Excellent
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      API Response Time
                    </Typography>
                    <LinearProgress variant="determinate" value={78} sx={{ mb: 1 }} />
                    <Typography variant="caption" color="text.secondary">
                      78% - Good
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminPage