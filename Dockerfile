FROM alpine:latest

RUN apk --no-cache add ca-certificates

COPY target/x86_64-unknown-linux-musl/release/ncm .

CMD ["./ncm"]
