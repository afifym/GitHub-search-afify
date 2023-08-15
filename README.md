## Solution

- Used separate redux slices for users and repos because they are different, and it's easier to assign typescript types this way
- handled last page for infinite scroll
- used tailwindcss as it's easy to use and very similar to normal css
- used tailwindcss custom styles to have shared UI between TextInput and SelectInput
- used redux thunks to better handle APIs caching with redux
- used intersection observer for bottom scroll for better performance
- moved most of the logic to redux to make the frontend (UI) code cleaner
- page state is not handled in the store so that it can be easily changed in the future (pagination bar for example)
