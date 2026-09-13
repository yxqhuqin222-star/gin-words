#!/usr/bin/env python3
"""Generate the site's fixed English pronunciation audio with Edge Neural TTS."""

import asyncio
import json
from pathlib import Path
import re

import edge_tts

ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / "index.html"
OUT = ROOT / "assets" / "audio"
VOICE = "en-GB-SoniaNeural"
CONCURRENCY = 6


def load_dataset(dataset_id: str):
    source = HTML.read_text(encoding="utf-8")
    match = re.search(
        rf'<script type="application/json" id="{dataset_id}">(.*?)</script>',
        source,
        re.S,
    )
    if not match:
        raise RuntimeError(f"dataset not found: {dataset_id}")
    return json.loads(match.group(1))


async def generate(dataset_key: str, items: list[dict]) -> None:
    semaphore = asyncio.Semaphore(CONCURRENCY)

    async def one(index: int, item: dict) -> None:
        target = OUT / f"{dataset_key}-{index:03d}.mp3"
        if target.exists() and target.stat().st_size > 0:
            return
        async with semaphore:
            for attempt in range(1, 4):
                try:
                    communicate = edge_tts.Communicate(
                        item["en"], VOICE, rate="-5%", volume="+0%"
                    )
                    await communicate.save(str(target))
                    print(f"{dataset_key} {index}/{len(items)} {target.name}", flush=True)
                    return
                except Exception:
                    if attempt == 3:
                        raise
                    await asyncio.sleep(attempt)

    await asyncio.gather(*(one(index, item) for index, item in enumerate(items, 1)))


async def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    await generate("words", load_dataset("word-data"))
    await generate("sentences", load_dataset("sentence-data"))


if __name__ == "__main__":
    asyncio.run(main())
