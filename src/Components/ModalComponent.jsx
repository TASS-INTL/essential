import React from 'react'

import { Box, Modal, Typography } from '@mui/material'

import { styleModal } from '../pages/PrivateRoutes/constants/constants'

export const ModalComponent = ({ handleOpen, children, titleModal, HandleClose }) => {
	return (
		<Modal
			open={handleOpen}
			onClose={HandleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={styleModal}>
				<Typography id='modal-modal-title' variant='h6' component='h2' className='text-center'>
					{titleModal}
				</Typography>
				{children}
			</Box>
		</Modal>
	)
}
