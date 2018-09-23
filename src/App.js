import React, { Component } from 'react';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
	formControl: {
		margin: 32,
		minWidth: 200,
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
        minWidth: 700
	},
});

const dayTimeIntervals = {
	morning: [
	    '0:00',
	    '1:00',
	    '2:00',
	    '3:00',
	    '4:00',
	    '5:00',
	    '6:00',
	    '7:00',
	    '8:00',
		'9:00'
	],
	day: [
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00',
		'16:00'
	],
	evening: [
		'17:00',
		'18:00',
		'19:00',
		'20:00',
		'21:00',
		'22:00',
		'23:00'
	],
	getDayTime(hour) {
		const hourString = `${hour}:00`;
		if (this.evening.includes(hourString)) {
			return 'evening';
		}

		if (this.day.includes(hourString)) {
			return 'day';
		}

		if (this.morning.includes(hourString)) {
			return 'morning';
		}
	}
}

const times = [
    '0:00',
    '1:00',
    '2:00',
    '3:00',
    '4:00',
    '5:00',
    '6:00',
    '7:00',
    '8:00',
	'9:00',
	'10:00',
	'11:00',
	'12:00',
	'13:00',
	'14:00',
	'15:00',
	'16:00',
	'17:00',
	'18:00',
	'19:00',
	'20:00',
	'21:00',
	'22:00',
	'23:00'
];

const daysConsts = {
	morning: 'утро',
	day: 'день',
	evening: 'вечер'
};

const mornings = {
	morning: 'Доброе',
	day: 'Добрый',
	evening: 'Добрый'
};

const DefaultText = `{morning} {dayTime}! Меня зовут Дарья, сегодня у нас запланирован урок в {time}! Пожалуйста, проверьте наушники, микрофон, камеру, установлен ли браузер Google Сhrome. 

Для того, чтобы начать урок, нужно перейти по ссылке ниже на нашу образовательную платформу. Ссылку открыть в Google Chrome браузере и предоставить доступ к камере и микрофону.

{link}
`;

class AppComponent extends Component {
    constructor(props) {
		super(props);

		const newDate = new Date();
		const anHour = newDate.getHours() + 1;

		this.state = {
			dayTime: dayTimeIntervals.getDayTime(anHour),
			text: DefaultText,
			time: `${anHour}:00`,
			link: '',
		};
	}

    generateText() {
        const text = this.state.text;

        return text
            .replace('{morning}', mornings[this.state.dayTime])
            .replace('{dayTime}', daysConsts[this.state.dayTime])
			.replace('{time}', this.state.time)
			.replace('{link}', this.state.link);
    }

    render() {
        const {classes} = this.props;

        return (
            <div className="App">
				<FormControl className={classes.formControl}>
                    <InputLabel htmlFor="day-time">DayTime</InputLabel>
                    <Select
                        value={this.state.dayTime}
                        onChange={(event) => {
							this.setState(({[event.target.name]: event.target.value}))
                        }}
                        inputProps={{
                            name: 'dayTime',
                            id: 'day-time'
                        }}
                    >
						<MenuItem value="morning">
							Утро
						</MenuItem>

                        <MenuItem value="day">
                            День
                        </MenuItem>

						<MenuItem value="evening">
							Вечер
						</MenuItem>
                    </Select>
                </FormControl>
				<FormControl className={classes.formControl}>
					<TextField
						id="the-link"
						label="Link"
						className={classes.formControl}
						value={this.state.link}
						onChange={(e) => this.setState({link: e.target.value})}
					/>
                </FormControl>
				<FormControl className={classes.formControl}>
					<InputLabel htmlFor="time">Time</InputLabel>
						<Select
							value={this.state.time}
							onChange={(event) => {
								this.setState(({[event.target.name]: event.target.value}))
							}}
							inputProps={{
								name: 'time',
								id: 'time'
							}}
							className={classes.formControl}
							variant='standard'
						>
							{
								times.map((time, i) => {
									return (
										<MenuItem value={time} key={i}>
											{time}
										</MenuItem>
									)
								})
							}
						</Select>
				</FormControl>
				<FormControl className={classes.formControl}>
					<TextField
						id="outlined-multiline-flexible"
						label="Текст письма"
						multiline
						rowsMax="10"
						value={this.state.text}
						onChange={(event) => {
						    this.setState({
                                text: event.target.value
                            })
                        }}
						className={classes.textField}
						margin="normal"
						variant="standard"
					/>
                    <CopyToClipboard text={this.generateText()}>
                        <Button size='medium' color='primary' variant='contained'>
                            Generate it
                        </Button>
                    </CopyToClipboard>
                </FormControl>
          </div>
        );
    }
}

const App = withStyles(styles)(AppComponent);

export default App;
