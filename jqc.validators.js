var jqCommons;
if (!jqCommons) {
    jqCommons = {};
}

//Creating new Class for Validations
jqCommons.validators = {};

/*
		Checks if the Zip Code is a valid US Zip code or not.
		returns Boolean result.

		Zip code without extension (eg. 12345) and without extension (eg. 12345-6789) is a valid format.
*/
jqCommons.validators.isValidUSZip = function(zip){
	var zipWithExt = /^[0-9]{5}-[0-9]{4}$/; //this string should contain zip code of 5 digits and 4 digit extension. eg. 40401-1234
	var zipWithoutExt = /^[0-9]{5}$/;		//this string should contain only 5 digits. eg. 40401

	return zipWithExt.test(zip.trim()) || zipWithoutExt(zip.trim());
}


/*
		Checks if the Email Address is a valid or not.
		returns Boolean result.
*/
jqCommons.validators.isValidEmail = function(email){
	var emailFormat = /([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/;

	return emailFormat.test(email.trim());
}