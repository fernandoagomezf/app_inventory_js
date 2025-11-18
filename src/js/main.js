
class Settings {
    constructor() {
        this._supabaseUrl = "https://ewxnxxuxozjziedzjvry.supabase.co";
        this._supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3eG54eHV4b3pqemllZHpqdnJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0ODgzNjcsImV4cCI6MjA3OTA2NDM2N30.ym9p2CyU4AwTip_ShPGdIxZo4hrFbWcSC_id3VoDB94";
    }

    get supabaseUrl() {
        return this._supabaseUrl;
    }

    get supabaseKey() {
        return this._supabaseKey;
    }
}

function loadView() {
    console.log("View Loaded");
}

window.addEventListener('load', loadView);
