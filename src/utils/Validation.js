const NonEmptyRegex = /\s/g;


function validateSearchForm(data) {
  return new Promise((resolve, reject) => {

  if(data.replace(NonEmptyRegex, '') === '') {
    throw new Error('Нужно ввести ключевое слово')
}
  resolve(data.replace(/&/,"%26"));
}) 


}
export  { validateSearchForm };