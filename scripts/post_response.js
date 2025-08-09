// Postman Tests for LibreTranslate API Response
// This script validates the response from the LibreTranslate API after a translation request
// This script is baked into the postman collection run in the GitHub Actions workflow

// Check status code 200 OK
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Parse response JSON
const jsonData = pm.response.json();

// Check that translatedText exists and is a string
pm.test("Response has translatedText", function () {
    pm.expect(jsonData).to.have.property("translatedText");
    pm.expect(jsonData.translatedText).to.be.a("string").and.to.not.be.empty;
});

// Check detectedLanguage object and its properties
pm.test("Response has detectedLanguage with language and confidence", function () {
    pm.expect(jsonData).to.have.property("detectedLanguage");
    pm.expect(jsonData.detectedLanguage).to.have.property("language");
    pm.expect(jsonData.detectedLanguage.language).to.be.a("string").and.to.not.be.empty;
    pm.expect(jsonData.detectedLanguage).to.have.property("confidence");
    pm.expect(jsonData.detectedLanguage.confidence).to.be.a("number").and.to.be.above(3);
});

// Verify detected language matches expected
const expectedDetectedLang = pm.iterationData.get("expected_detected_language");

if (expectedDetectedLang) {
    pm.test("Detected language matches expected", function () {
        pm.expect(jsonData.detectedLanguage.language).to.eql(expectedDetectedLang);
    });
}