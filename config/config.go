package config

import (
	"github.com/ilyakaznacheev/cleanenv"

	log "github.com/sirupsen/logrus"
)

type Configuration struct {
	Access Access
	Port   int `env:"PORT" env-default:"8080"`
	State  State
}

type State struct {
	Video     Video
	Subtitles []Subtitle
	Playback  Playback
}

type Access struct {
	WatchPIN string `env:"WATCH_PIN"`
	AdminPIN string `env:"ADMIN_PIN" env-default:"0000"`
}

type Subtitle struct {
	Path         string
	Language     string
	LanguageCode string
}

type Playback struct {
	PlaybackRunning bool
	Seconds         int
}

type Video struct {
	Title string `env:"VIDEO_TITLE"`
	Path  string `env:"VIDEO_PATH"`
}

var config Configuration

func Init() {
	if err := cleanenv.ReadEnv(&config); err != nil {
		log.Fatal("Error when parsing the configuration.")
	}
}

func GetPort() (port int) {
	return config.Port
}

func GetState() (state State) {
	return config.State
}

func SetVideoTitle(title string) {
	config.State.Video.Title = title
}

func SetVideoPath(path string) {
	config.State.Video.Path = path
}

func StartPlayback() {
	config.State.Playback.PlaybackRunning = true
}

func PausePlayback() {
	config.State.Playback.PlaybackRunning = false
}

func ResetPlayback() {
	config.State.Playback.PlaybackRunning = false
	config.State.Playback.Seconds = 0
}

func SetPlaybackSeconds(seconds int) {
	config.State.Playback.Seconds = seconds
}

func SetSubtitles(subtitles []Subtitle) {
	config.State.Subtitles = subtitles
}

func SetWatchPIN(pin string) {
	config.Access.WatchPIN = pin
}

func ClearWatchPIN() {
	config.Access.WatchPIN = ""
}

func GetWatchPIN() string {
	return config.Access.WatchPIN
}

func SetAdminPIN(pin string) {
	config.Access.AdminPIN = pin
}

func GetAdminPIN() string {
	return config.Access.AdminPIN
}
