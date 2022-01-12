import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Icon, Fab, Grid, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup } from '@material-ui/core'
import { SimpleCard } from 'app/components'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import { EventBusy } from '@material-ui/icons'
import { store } from 'app/reduxSaga/store'

const suggestions = [
    { label: 'Text' },
    { label: 'Checkbox' },
    { label: 'Radio' }
]
export default function FormDialog() {
    const [open, setOpen] = React.useState(false)
    const [formTitle, setFormTitle] = React.useState();
    const [formQuestion, setFormQuestion] = React.useState([])
    const [question, setQuestion] = React.useState();
    const [type, setType] = React.useState();
    const [option, setOption] = React.useState();
    const [choice, setChoice] = React.useState([]);

    function handleClickOpen() {
        setOpen(true)
    }

    function addFormQuestion() {
        setFormQuestion(formQuestion => [...formQuestion, {
            'question': question,
            'type': type,
            'options': choice
        }])
        setQuestion('')
        setType('')
        setChoice([])
        console.log(formQuestion)
    }
    function handleClose() {
        setOpen(false)
    }
    function addOptions(event) {
        setOption(event.target.value)
    }
    function addOptionToType() {
        setChoice(choice => [...choice, option])
        document.querySelector("#addOptionValue").value = "";
        setOption('')
    }
    function createForm() {
        let form = {
            "formTitle": formTitle,
            "formData": formQuestion
        }
        let input = {
            data: []
        }

        var tmp = []

        var users = JSON.parse(localStorage.getItem("webClueForm")) ? JSON.parse(localStorage.getItem("webClueForm")) : null;



        console.log(users, 'existing users')
        if (users) {
            localStorage.removeItem('webClueForm');
            tmp = [...users];
            // tmp.push(users)
        }
        tmp.push(form)
        console.log('temp values', tmp)
        localStorage.setItem('webClueForm', JSON.stringify(tmp));
        store.dispatch({ type: "COMPUTE", From: form });
        setFormQuestion([])
        setFormTitle('');
        setOpen(false)
    }
    return (
        <div className="m-sm-30">
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                <Fab
                    size="small"
                    color="primary"
                    aria-label="Add"
                >
                    <Icon>add</Icon>
                </Fab>
                <span style={{ marginLeft: "5px" }}>Create New Form</span>
            </Button>
            <Dialog
                fullWidth
                maxWidth={"md"}
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <div className="m-sm-30">
                    <DialogContent>
                        <SimpleCard>
                            <TextField
                                margin="dense"
                                id="name"
                                onChange={(event) => setFormTitle(event.target.value)}
                                label="Untitled Form"
                                type="text"
                                fullWidth
                            />
                        </SimpleCard>
                        <div className="py-3" />
                        {formQuestion.map((formquestion) => (
                            <>
                                <SimpleCard className="py-3">
                                    <h1>{formquestion.question}</h1>
                                    {formquestion.type == "Text" && (
                                        <>
                                            <TextField
                                                id="name"
                                                label="text input"
                                                type="text"
                                            />
                                        </>
                                    )}
                                    {formquestion.type == "Checkbox" && (
                                        <>
                                            <FormGroup >
                                                {formquestion.options.map((option) => (
                                                    <FormControlLabel
                                                        control={<Checkbox />}
                                                        label={option}
                                                        labelPlacement={option}
                                                        color="primary"
                                                    />
                                                ))}
                                            </FormGroup>

                                        </>
                                    )}
                                    {formquestion.type == "Radio" && (
                                        <>
                                            <RadioGroup
                                                className="mb-4"
                                                name={option}
                                                row

                                            >
                                                {formquestion.options.map((option) => (
                                                    <FormControlLabel
                                                        value={option}
                                                        control={<Radio />}
                                                        label={option}
                                                        labelPlacement={option}
                                                        color="primary"
                                                    />
                                                ))}
                                            </RadioGroup>

                                        </>
                                    )}

                                </SimpleCard>
                                <div className="py-3" />
                            </>
                        ))}
                        <SimpleCard>
                            <Grid container spacing={3}>

                                <Grid item lg={8} md={8} sm={12} xs={12}>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        value={question}
                                        onChange={(event) => setQuestion(event.target.value)}
                                        label="Untitled Question"
                                        type="text"
                                        fullWidth
                                    /></Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <Autocomplete
                                        options={suggestions}
                                        value={type}
                                        onChange={(event, value) => setType(value.label)}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Type"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                {(type == "Checkbox" || type == "Radio") && (
                                    <>
                                        {choice.length > 0 && (
                                            <Grid container spacing={3}>
                                                <b>Added Options: </b> {choice.join(", ")}
                                            </Grid>)}
                                        <div className="py-3" />

                                        <div>
                                            <TextField
                                                margin="dense"
                                                id="addOptionValue"
                                                onChange={addOptions}
                                                label="Add Option"
                                                type="text"
                                            /></div>
                                        <Button color="primary" onClick={addOptionToType}>Add option</Button>
                                    </>
                                )
                                }
                            </Grid>
                            <div className="py-3" />
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={addFormQuestion}
                            >
                                Add Question
                            </Button>
                        </SimpleCard>
                    </DialogContent></div>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button onClick={createForm} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
