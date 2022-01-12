import React, { Fragment, useEffect, useState } from 'react'
import { SimpleCard } from 'app/components'

import { Grid, Card } from '@material-ui/core'
import StatCards from './shared/StatCards'
import { useTheme } from '@material-ui/styles'
import FormDialog from '../material-kit/dialog/FormDialog'
import { store } from 'app/reduxSaga/store'
import FormData from './FormData'

const Analytics = () => {
    const theme = useTheme()
    return (
        <Fragment>
            <div className="analytics m-sm-30 mt-6">
                <Grid container spacing={3}>
                    <SimpleCard>
                    <FormDialog />
                </SimpleCard>
                </Grid>
            </div>

            <FormData></FormData>
        </Fragment>
    )
}

export default Analytics
