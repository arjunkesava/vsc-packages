import axios, { AxiosResponse } from 'axios';
import { NpmSearchResults } from '../../types';
import { httpStatusCodes, URL_NPM_SEARCH } from '../../constants';

const searchNpm = async (searchTerm: string): Promise<NpmSearchResults> => {
  return await axios.get(`${URL_NPM_SEARCH}${searchTerm}`).then((response: AxiosResponse) => {
    if (response.status === httpStatusCodes.OK) {
      return response.data;
    }

    return Promise.reject(
      new Error(`An error occured whilst trying to search NPM for "${searchTerm}"`)
    );
  });
};

export default searchNpm;