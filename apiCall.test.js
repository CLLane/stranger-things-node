const fetchData = require('./apiCall');

describe("data", () => {
  let mockResponse, mockData;

  beforeEach(() => {
    
    mockResponse = {}

    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })
    })
  })
  xit('fetchData should call fetch with the correct url', () => {
    fetchData('Is this the right one?')
    expect(window.fetch).toHaveBeenCalledWith('Is this the right one?')
  });
  it('should return a successfull response (HAPPY)', () => {
    expect(fetchData('url')).resolves.toEqual({})
  })
  it('should return an error if the promise doesnt resolve', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error("Failed to retrieve Stranger Things data"))
    })
   expect(fetchData('url')).rejects.toEqual(Error("Failed to retrieve Stranger Things data"))
  })
})