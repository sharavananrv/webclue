import React from "react";
import { store } from "app/reduxSaga/store";
import { SimpleCard } from 'app/components'
import { Grid } from '@material-ui/core'


export default class FormData extends React.Component {
    constructor(props) {
        super(props);
        this.setLoading = this.setLoading.bind(this);
        this.state = {
            loading: false,
            value: store.getState()
        };
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() =>
            this.setState({
                value: store.getState()
            })
        );
    }
    componentWillUnmount() {
        this.unsubscribe();
    }

    setLoading(loading) {
        this.setState({ loading });
    }
    render() {
        const data = this.state.value
        console.log(this.state.value)

        return (
            <div className="m-sm-30">
                <Grid item lg={8} md={8} sm={12} xs={12}>
                    {data.length > 0 && JSON.parse(data).map(function (d, idx) {

                        return (<><SimpleCard key={idx}>{d.formTitle}</SimpleCard>  <div className="py-3" /></>)
                    })}
                    {data.length == 0 && <span>No Form created</span>}
                </Grid>
            </div>
        );
    }
}
