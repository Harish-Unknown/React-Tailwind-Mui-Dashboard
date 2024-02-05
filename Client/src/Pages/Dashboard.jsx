import React from 'react'
import Box from '@mui/material/Box';
import SideNav from '../components/SideNav'
import Navbar from '../components/Navbar'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Intensity from '../components/Intensity';
import PestFactorsDistribution from '../components/PestFactorsDistribution';
import Country from '../components/Country';
import Likelihood from '../components/Likelihood';

export default function Dashboard() {
  return (
    <div className='bg-gradient-to-b h-[185vh] from-gray-900 via-black to-gray-900'>
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: 'flex' }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1 className='text-3xl text-white uppercase font-bold'>Dashboard</h1>
          <Box height={30} />
          <Grid container spacing={2}>
            <Grid item lg={8} md={12}>
              <Stack spacing={2}>
                <Card style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)"
                }}>
                  <CardContent>
                    <Intensity />
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid item lg={4} md={12}>
              <Card style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  paddingBottom: '20px'
                }}>
                <CardContent>
                  <PestFactorsDistribution />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box height={20} />
          <Grid container spacing={2}>
            <Grid item lg={6} md={12}>
              <Stack spacing={2}>
                <Card style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)"
                }}>
                  <CardContent>
                    <Country />
                  </CardContent>
                </Card>
                <Stack spacing={2}>
                <Card style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)"
                }} sx={{height:120}}>
                <CardContent>

                </CardContent>
              </Card>
              <Card style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)"
                }} sx={{height:120}}>
                <CardContent>
                  
                </CardContent>
              </Card>
                </Stack>
                
              </Stack>
            </Grid>
            <Grid item lg={6} md={12}>
              <Stack spacing={2}>
                <Card style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)"
                }}>
                  <CardContent>
                    <Likelihood />
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            
          </Grid>
          <Box height={20} />
        </Box>
      </Box>
    </div >
  )
}
