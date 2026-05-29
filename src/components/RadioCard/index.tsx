import React from 'react';

import { RadioCardProps } from './radioCardDTO';

import { Pressable } from '../ui/pressable';
import { RadioGroup, Radio } from '../ui/radio';
import { VStack } from '../ui/vstack';
import { HStack } from '../ui/hstack';
import { Typography } from '../Typography';

export function RadioCard({ options, value, onChange }: RadioCardProps) {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <VStack space="lg">
        {options.map(item => {
          const checked = item.value === value;

          return (
            <Pressable
              key={item.value}
              disabled={item.disabled}
              onPress={() => onChange(item.value)}
              className={`border rounded-2xl p-4 
                ${
                  checked
                    ? 'border-orange-400 bg-orange-50'
                    : 'border-zinc-200 bg-white'
                } 
                ${item.disabled ? 'opacity-50' : ''}
              `}
            >
              <HStack space="md" className="items-center">
                <Radio value={item.value}>
                  <HStack
                    className={`mt-1 h-5 w-5 rounded-full border-2 items-center justify-center ${
                      checked ? 'border-orange-500' : 'border-zinc-300'
                    }`}
                  >
                    {checked && (
                      <HStack className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                    )}
                  </HStack>
                </Radio>

                <VStack className="flex-1">
                  <Typography title={item.title} bold />

                  {!!item.subTitle && (
                    <Typography title={item.subTitle} textColor="#A88A72" />
                  )}
                </VStack>
              </HStack>
            </Pressable>
          );
        })}
      </VStack>
    </RadioGroup>
  );
}
