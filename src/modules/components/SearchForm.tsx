import {
	Button,
	Card,
	CardBody,
	Form,
	FormHelperText,
	FormSelect,
	FormSelectOption,
	Grid,
	GridItem,
	HelperText,
	HelperTextItem,
	TextInput,
} from "@patternfly/react-core";
import { ReactNode, useEffect } from "react";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import { Attribute, ATTRIBUTES } from "../api/rekor_api";
import { ExclamationCircleIcon } from "@patternfly/react-icons";

export interface FormProps {
	defaultValues?: FormInputs;
	isLoading: boolean;
	onSubmit: (query: FormInputs) => void;
}

export interface FormInputs {
	attribute: Attribute;
	value: string;
}

type Rules = Omit<
	RegisterOptions,
	"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;

interface InputConfig {
	name: string;
	helperText?: ReactNode;
	rules: Rules;
}

const inputConfigByAttribute: Record<FormInputs["attribute"], InputConfig> = {
	email: {
		name: "Email",
		rules: {
			pattern: {
				value: /\S+@\S+\.\S+/,
				message: "Entered value does not match the email format: 'S+@S+.S+'",
			},
		},
	},
	hash: {
		name: "Hash",
		rules: {
			pattern: {
				value: /^(sha256:)?[0-9a-fA-F]{64}$|^(sha1:)?[0-9a-fA-F]{40}$/,
				message:
					"Entered value does not match the hash format: '^(sha256:)?[0-9a-fA-F]{64}$|^(sha1:)?[0-9a-fA-F]{40}$'",
			},
		},
	},
	commitSha: {
		name: "Commit SHA",
		helperText: (
			<>
				Only compatible with{" "}
				<a
					href="https://github.com/sigstore/gitsign"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						textDecoration: "underline",
					}}
				>
					sigstore/gitsign
				</a>{" "}
				entries
			</>
		),
		rules: {
			pattern: {
				value: /^[0-9a-fA-F]{40}$/,
				message:
					"Entered value does not match the commit SHA format: '^[0-9a-fA-F]{40}$'",
			},
		},
	},
	uuid: {
		name: "Entry UUID",
		rules: {
			pattern: {
				value: /^[0-9a-fA-F]{64}|[0-9a-fA-F]{80}$/,
				message:
					"Entered value does not match the entry UUID format: '^[0-9a-fA-F]{64}|[0-9a-fA-F]{80}$'",
			},
		},
	},
	logIndex: {
		name: "Log Index",
		rules: {
			min: {
				value: 0,
				message: "Entered value must be larger than 0",
			},
			pattern: {
				value: /^\d+$/,
				message: "Entered value must be of type int64",
			},
		},
	},
};

export function SearchForm({ defaultValues, onSubmit, isLoading }: FormProps) {
	const { handleSubmit, control, watch, setValue, trigger } =
		useForm<FormInputs>({
			mode: "all",
			reValidateMode: "onChange",
			defaultValues: {
				attribute: "email",
				value: "",
			},
		});

	useEffect(() => {
		if (defaultValues) {
			setValue("attribute", defaultValues.attribute);
			setValue("value", defaultValues.value);
		}
	}, [defaultValues, setValue]);

	const watchAttribute = watch("attribute");

	useEffect(() => {
		if (control.getFieldState("attribute").isTouched) {
			trigger();
		}
	}, [watchAttribute, trigger, control]);

	const rules = Object.assign(
		{
			required: {
				value: true,
				message: "A value is required",
			},
			pattern: undefined,
			min: undefined,
		},
		inputConfigByAttribute[watchAttribute].rules,
	);

	return (
		<Card>
			<CardBody>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Grid hasGutter={true}>
						<GridItem sm={4}>
							<Controller
								name="attribute"
								control={control}
								render={({ field }) => (
									<FormSelect
										id="rekor-search-type"
										{...field}
										label="Attribute"
									>
										{ATTRIBUTES.map(attribute => (
											<FormSelectOption
												label={inputConfigByAttribute[attribute].name}
												key={attribute}
												value={attribute}
											/>
										))}
									</FormSelect>
								)}
							/>
						</GridItem>
						<GridItem
							sm={8}
							md={6}
						>
							<Controller
								name="value"
								control={control}
								rules={rules}
								render={({ field, fieldState }) => (
									<>
										<TextInput
											aria-label={`${inputConfigByAttribute[watchAttribute].name} input field`}
											{...field}
											label={inputConfigByAttribute[watchAttribute].name}
											placeholder={inputConfigByAttribute[watchAttribute].name}
											type={"email"}
											validated={fieldState.invalid ? "error" : "default"}
										/>
										{fieldState.invalid && (
											<FormHelperText>
												<HelperText>
													<HelperTextItem
														icon={<ExclamationCircleIcon />}
														variant={fieldState.invalid ? "error" : "success"}
													>
														{fieldState.invalid
															? fieldState.error?.message
															: inputConfigByAttribute[watchAttribute]
																	.helperText}
													</HelperTextItem>
												</HelperText>
											</FormHelperText>
										)}
									</>
								)}
							/>
						</GridItem>
						<GridItem
							sm={12}
							md={2}
						>
							<Button
								variant="primary"
								id="search-form-button"
								isBlock={true}
								isLoading={isLoading}
								type="submit"
								spinnerAriaLabel={"Loading"}
								spinnerAriaLabelledBy={"search-form-button"}
							>
								Search
							</Button>
						</GridItem>
					</Grid>
				</Form>
			</CardBody>
		</Card>
	);
}
