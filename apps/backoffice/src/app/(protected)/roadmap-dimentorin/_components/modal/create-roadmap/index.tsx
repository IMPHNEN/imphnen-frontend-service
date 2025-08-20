import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Input, Select, Textarea } from "@imphnen-frontend-service/ui/atoms";
import { Accordion, Modal, ModalProps } from "@imphnen-frontend-service/ui/molecules";
import { cn, For } from "@imphnen-frontend-service/utils";
import { FC } from "react";

const labelClass = cn('text-neutral-800 text-[10px] font-medium mb-1.5 inline-block md:text-xs md:mb-2 xl:text-p3')

export const ModalCreateRoadmap: FC<Omit<ModalProps, 'children'>> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="xl:max-w-[64rem] bg-white px-10 py-9"
      closeButtonClassName="hidden"
    >
      <div className="overflow-y-auto max-h-[80vh]">
        <h1 className="bg-primary-50 px-6 py-3 text-neutral-800 text-p2 font-semibold mb-8">
          Create Roadmaps
        </h1>

        <div className="grid grid-cols-5 gap-6 mb-12">
          <div className="col-span-3">
            <label className={labelClass}>Prompt</label>
            <Textarea
              className="min-w-full w-full h-[calc(100%-2rem)]"
              placeholder="Create a learning roadmap for (subject) at the (level) level. Include topics, estimated duration, and logical progression."
            />
          </div>
          <div className="col-span-2 space-y-8">
            <div>
              <label className={labelClass}>Roadmap Name</label>
              <Input type="text" className="min-w-full w-full" placeholder="Nama Roadmap" />
            </div>
            <div>
              <label className={labelClass}>Roadmap Name</label>
              <Select className="w-full">
                <option value="pemula">Pemula</option>
                <option value="menengah">Menengah</option>
              </Select>
            </div>
            <div>
              <label className={labelClass}>Model</label>
              <Select className="w-full">
                <option value="gpt-3.5-turbo">GPT 3.5 Turbo</option>
                <option value="gpt-4">GPT 4</option>
                <option value="gpt-4-32k">GPT 4 32k</option>
              </Select>
            </div>
          </div>
          
          <div className="col-span-full">
            <Button>
              Generate Roadmap
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-neutral-600 text-p2 font-semibold mb-8">
            Roadmap Preview
          </h2>
          <div className="space-y-2.5">
            <For data={Array.from({ length: 3 })}>
              {(_, index) => (
                <Accordion
                  key={index}
                  title={`Day ${index + 1}`}
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tincidunt nisl, id consequat mi malesuada vel. Nulla facilisi. Nam in turpis ligula."
                />
              )}
            </For>
          </div>
        </div>

        <div className="flex justify-end mt-12">
          <Button type="button" className="flex items-center gap-5">
            Submit Roadmap
            <ArrowRightOutlined />
          </Button>
        </div>
      </div>
    </Modal>
  )
}
