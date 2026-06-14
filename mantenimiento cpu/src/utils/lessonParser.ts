export interface CommandBreakdown {
  flag: string;
  description: string;
}

export interface LessonCommand {
  id: string;
  title: string;
  cognitiveBridge: string;
  technicalExplanation: string;
  practicalGuide: string;
  commandLine: string[];
  breakdowns: CommandBreakdown[];
}

export interface ParsedLesson {
  moduleTitle: string;
  author: string;
  intro: string;
  commands: LessonCommand[];
  challengeTitle: string;
  challengeContent: string;
}

export function parseLessonText(rawText: string): ParsedLesson {
  const result: ParsedLesson = {
    moduleTitle: '',
    author: '',
    intro: '',
    commands: [],
    challengeTitle: '',
    challengeContent: ''
  };

  const lines = rawText.split('\n').map(l => l.trimRight());
  let state = 'INIT';
  let currentCommand: Partial<LessonCommand> | null = null;
  let currentSectionText = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Detección de secciones principales
    if (trimmed.startsWith('MÓDULO') || trimmed.startsWith('Módulo')) {
      result.moduleTitle = trimmed;
      continue;
    }
    if (trimmed.startsWith('Por:')) {
      result.author = trimmed.replace('Por:', '').trim();
      continue;
    }
    if (trimmed.startsWith('INTRODUCCIÓN ANDRAGÓGICA:')) {
      state = 'INTRO';
      continue;
    }
    if (trimmed.startsWith('EL DESAFÍO') || trimmed.includes('DESAFÍO ANDRAGÓGICO')) {
      state = 'CHALLENGE_TITLE';
      result.challengeTitle = trimmed;
      continue;
    }
    
    // Detección de nuevos comandos (usualmente empiezan con un número seguido de punto "1. Nombre")
    // O si hay una línea divisoria seguida de un título de comando.
    if (trimmed.match(/^\d+\.?\s+([A-Z0-9]+.*)/)) {
      if (currentCommand) {
        result.commands.push(currentCommand as LessonCommand);
      }
      state = 'COMMAND_INIT';
      currentCommand = {
        id: `cmd-${result.commands.length + 1}`,
        title: trimmed,
        cognitiveBridge: '',
        technicalExplanation: '',
        practicalGuide: '',
        commandLine: [],
        breakdowns: []
      };
      continue;
    }

    // Procesamiento basado en el estado
    if (state === 'INTRO') {
      if (trimmed === '---') {
        state = 'AWAITING_COMMAND';
        continue;
      }
      if (trimmed !== '' && !trimmed.startsWith('===')) {
        result.intro += line + '\n';
      }
    } 
    else if (state.startsWith('COMMAND') && currentCommand) {
      if (trimmed.startsWith('* El Puente Cognitivo:') || trimmed.startsWith('- El Puente Cognitivo:')) {
        state = 'COMMAND_COGNITIVE';
        currentCommand.cognitiveBridge = trimmed.split(':')[1]?.trim() || '';
      } else if (trimmed.startsWith('* Explicación Técnica:') || trimmed.startsWith('- Explicación Técnica:')) {
        state = 'COMMAND_TECHNICAL';
        currentCommand.technicalExplanation = trimmed.split(':')[1]?.trim() || '';
      } else if (trimmed.startsWith('* Guía Práctica Segura:') || trimmed.startsWith('- Guía Práctica Segura:')) {
        state = 'COMMAND_PRACTICAL';
        currentCommand.practicalGuide = trimmed.split(':')[1]?.trim() || '';
      } else if (trimmed.startsWith('* Comando y Desglose:') || trimmed.startsWith('- Comando y Desglose:')) {
        state = 'COMMAND_DESGLOSE';
      } else if (trimmed.startsWith('>')) {
        currentCommand.commandLine!.push(trimmed.replace('>', '').trim());
      } else if (state === 'COMMAND_DESGLOSE' && trimmed.startsWith('-') && trimmed.includes(':')) {
        const parts = trimmed.substring(1).split(':');
        currentCommand.breakdowns!.push({
          flag: parts[0].trim(),
          description: parts.slice(1).join(':').trim()
        });
      } else if (trimmed !== '' && !trimmed.startsWith('---')) {
        // Append text to current subsection
        if (state === 'COMMAND_COGNITIVE') currentCommand.cognitiveBridge += '\n' + line;
        else if (state === 'COMMAND_TECHNICAL') currentCommand.technicalExplanation += '\n' + line;
        else if (state === 'COMMAND_PRACTICAL') currentCommand.practicalGuide += '\n' + line;
      }
    } 
    else if (state === 'CHALLENGE_TITLE') {
      if (trimmed.startsWith('---')) {
        state = 'CHALLENGE_CONTENT';
      } else if (trimmed !== '' && !trimmed.startsWith('===')) {
        result.challengeTitle += '\n' + trimmed;
      }
    }
    else if (state === 'CHALLENGE_CONTENT') {
      if (!trimmed.startsWith('===')) {
        result.challengeContent += line + '\n';
      }
    }
  }

  // Push el último comando si existe
  if (currentCommand) {
    result.commands.push(currentCommand as LessonCommand);
  }

  // Limpiar espacios extra
  result.intro = result.intro.trim();
  result.challengeContent = result.challengeContent.trim();
  result.commands.forEach(cmd => {
    cmd.cognitiveBridge = cmd.cognitiveBridge.trim();
    cmd.technicalExplanation = cmd.technicalExplanation.trim();
    cmd.practicalGuide = cmd.practicalGuide.trim();
  });

  return result;
}
