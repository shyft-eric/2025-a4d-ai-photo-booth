"use client"

import { PromptBuilder } from "./prompt-builder"

interface Character {
  id: string
  name: string
  emoji: string
  vibe: string
  holiday: string
}

interface AppTypeOption {
  id: string
  name: string
  pattern: string
  screens: string[]
}

interface HomeClientProps {
  characters: Character[]
  appTypes: AppTypeOption[]
  charactersByHoliday: {
    christmas: Array<{ key: string; data: { name: string; emoji: string } }>
    hanukkah: Array<{ key: string; data: { name: string; emoji: string } }>
    kwanzaa: Array<{ key: string; data: { name: string; emoji: string } }>
    winter: Array<{ key: string; data: { name: string; emoji: string } }>
  }
}

export function HomeClient({ characters, appTypes, charactersByHoliday }: HomeClientProps) {
  return (
    <>
      {/* Prompt Builder */}
      <div className="mb-8">
        <PromptBuilder characters={characters} appTypes={appTypes} />
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-green-50 rounded-xl">
            <span className="text-2xl">1</span>
            <p className="mt-2 font-medium">Fill out the form above with your app idea</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl">
            <span className="text-2xl">2</span>
            <p className="mt-2 font-medium">Copy and paste the prompt into Claude Code</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <span className="text-2xl">3</span>
            <p className="mt-2 font-medium">Watch your app come to life and get your collage!</p>
          </div>
        </div>
      </div>

      {/* Character & App Type Reference */}
      <details className="mb-8 bg-white rounded-2xl shadow-sm">
        <summary className="p-6 cursor-pointer font-bold text-lg">
          View All Characters & App Types
        </summary>
        <div className="px-6 pb-6">
          <CharacterAppTypeGrid
            charactersByHoliday={charactersByHoliday}
            appTypes={appTypes}
          />
        </div>
      </details>
    </>
  )
}

function CharacterList({
  charactersByHoliday,
}: {
  charactersByHoliday: HomeClientProps["charactersByHoliday"]
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
          Christmas
        </h3>
        <div className="flex flex-wrap gap-2">
          {charactersByHoliday.christmas.map(({ key, data }) => (
            <span
              key={key}
              className="px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm"
            >
              {data.emoji} {data.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
          Hanukkah
        </h3>
        <div className="flex flex-wrap gap-2">
          {charactersByHoliday.hanukkah.map(({ key, data }) => (
            <span
              key={key}
              className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm"
            >
              {data.emoji} {data.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
          Kwanzaa
        </h3>
        <div className="flex flex-wrap gap-2">
          {charactersByHoliday.kwanzaa.map(({ key, data }) => (
            <span
              key={key}
              className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm"
            >
              {data.emoji} {data.name}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">
          Winter
        </h3>
        <div className="flex flex-wrap gap-2">
          {charactersByHoliday.winter.map(({ key, data }) => (
            <span
              key={key}
              className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm"
            >
              {data.emoji} {data.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function CharacterAppTypeGrid({
  charactersByHoliday,
  appTypes,
}: {
  charactersByHoliday: HomeClientProps["charactersByHoliday"]
  appTypes: AppTypeOption[]
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-bold mb-3">Characters</h3>
        <CharacterList charactersByHoliday={charactersByHoliday} />
      </div>
      <div>
        <h3 className="font-bold mb-3">App Types</h3>
        <div className="grid grid-cols-2 gap-2">
          {appTypes.map((type) => (
            <div key={type.id} className="p-3 bg-neutral-50 rounded-xl">
              <p className="font-medium text-sm">{type.name}</p>
              <p className="text-xs text-neutral-500 mt-1">{type.pattern}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
