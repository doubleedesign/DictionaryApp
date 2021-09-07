import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';
import { styledHelpers, TextField, Button, Progress } from 'grape-ui-react';
import { SearchForm } from './Search.style';
import { CgSearch } from 'react-icons/cg';
import ResultList from '../ResultList/ResultList';
import Definition from '../Definition/Definition';
import Message from '../Message/Message';
import 'pure-react-carousel/dist/react-carousel.es.css';

const theme = {
	buttons: {
		...styledHelpers.buttonThemes(),
	},
};

export const Search: React.FC = function() {
	const [liveSearchTerm, setLiveSearchTerm] = useState<string>('');
	const [submittedSearchTerm, setSubmittedSearchTerm] = useState<string>('');
	const apiKeyDict = '16a63a57-7277-4843-8034-4285a3b986ee';
	const apiKeyThes = '0803c54f-d908-4630-86a1-0e31e656d692';
	const [definitions, setDefinitions] = useState<any[]>([]);
	const [queryRunning, setQueryRunning] = useState<boolean>(false);

	/**
	 * Every time the input value changes, the liveSearchTerm variable is updated
	 * @param event
	 */
	function updateSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
		setLiveSearchTerm(event.target.value);
	}

	/**
	 * When the search form is submitted, recognise the input is now "the term to actually search for"
	 * by putting it into a different state variable.
	 * Reason for separating them like this to show appropriate messages,
	 * if they're the same variable then users see "nothing found" when they've started typing without submitting
	 * @param event
	 */
	function handleSearchSubmit(event: { preventDefault: () => void; }) {
		event.preventDefault();

		setSubmittedSearchTerm(liveSearchTerm);
		// can't run the actual search within this function because it will get the previous value of submittedSearchTerm,
		// not the one we just set here, so see below useEffect hook for the actual search query
	}

	/**
	 * When the submitted search term changes, do the API queries
	 * and save the definitions and synonyms to the relevant state variables
	 */
	useEffect(() => {

		// setQueryRunning to true to show the loading state
		setQueryRunning(true);

		// Run definitions query
		getDefinitions(submittedSearchTerm).then(definitions => {

			// When getDefinitions returns something, wait half a second before proceeding
			// to ensure loading state always shows
			delay(500).then(function() {

				// Save the definitions to the state variable
				setDefinitions(definitions.slice(0, 3));

				// setQueryRunning to false so the loading state disappears
				setQueryRunning(false);
			})
		})


	}, [submittedSearchTerm]);


	/**
	 * The function to get data from the API
	 * (The thesaurus API gets basic definition data as well as the synonyms, so just using the one query)
	 * @param term
	 */
	async function getDefinitions(term: string) {
		const query = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${term}?key=${apiKeyThes}`;

		return axios.get(query)
			.then(response => {
				console.log(response);
				return response.data;
			})
			.catch(error => {
				console.log(error);
			})
	}

	/**
	 * Utility function to add a delay before doing something
	 * @param milliseconds
	 */
	async function delay(milliseconds: number) {
		return new Promise(response => setTimeout(response, milliseconds));
	}

	/**
	 * Component output
	 */
	return (
		<ThemeProvider theme={theme}>
			<SearchForm onSubmit={handleSearchSubmit}>
				<TextField labelText="Search for:" placeholder="Enter search term" autoFocus={true} onChange={updateSearchTerm} />
				<Button variant="dark" onClick={handleSearchSubmit}><CgSearch/></Button>
				{ submittedSearchTerm && queryRunning ?
					<Progress indicatorColor="brandPrimary" trackColor="FormControlFilledBg" animationDuration="2s" />
					: <Progress total={10} value={0} trackColor="brandLight" />
				}
			</SearchForm>
			{ /* If a search term has been submitted and returned definition objects, show definition cards  */ }
			{submittedSearchTerm && !queryRunning && definitions && (typeof definitions[0] == 'object') ?
				<ResultList>
					{definitions.map((definition, index) => (
						<Definition key={index}
									word={definition.hwi.hw}
									type={definition.fl}
									definitions={definition.shortdef}
									synonyms={(definition.meta.syns).slice(0,5)}/>
					))}
				</ResultList>
				: null
			}
			{ /* If a search term has been submitted and the query is still running, show progress indicator */ }
			{ submittedSearchTerm && queryRunning ?
				<Progress
					indicatorColor="brandPrimary"
					progressType="circular"
					trackColor="formControlFilledBg"
				/>
				: null
			}
			{ /* If a search term has been submitted and query run but there were no valid definitions, show an error */ }
			{ submittedSearchTerm && !queryRunning && (!definitions || typeof definitions[0] !== 'object') ?
				<Message color="brandDanger" text="Nothing found"/>
				: null
			}
			{ /* If there is no submitted search term, show a prompt */ }
			{ !submittedSearchTerm ?
				<Message color="brandSuccess" text="Please enter a search term"/>
				: null
			}
		</ThemeProvider>
	)
}

export default Search;